import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { jobId, analyst, decision, isConfirmation, agrees } = req.body;

  if (!jobId || !analyst) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('job-alignment');
    const collection = db.collection('job_decisions');

    // Verificar se job já existe
    const existingJob = await collection.findOne({ jobId });

    if (!existingJob) {
      // Primeira decisão - criar novo job
      if (!decision) {
        return res
          .status(400)
          .json({ message: 'Decision is required for new job' });
      }

      const newJob = {
        jobId,
        status: 'pending',
        decisions: [
          {
            analyst,
            decision,
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await collection.insertOne(newJob);
      return res.status(201).json({
        message: 'First decision submitted successfully',
        status: 'pending',
        nextStep: 'waiting_second_analyst',
      });
    } else if (
      existingJob.status === 'pending' &&
      existingJob.decisions.length === 1
    ) {
      // Segunda análise - verificar se é confirmação
      if (!isConfirmation) {
        return res
          .status(400)
          .json({
            message: 'This is a second analysis - confirmation required',
          });
      }

      if (agrees === true) {
        // Analista concorda - resolver job
        const firstDecision = existingJob.decisions[0].decision;

        await collection.updateOne(
          { jobId },
          {
            $set: {
              status: 'resolved',
              finalDecision: firstDecision,
              updatedAt: new Date(),
            },
            $push: {
              decisions: {
                analyst,
                decision: 'AGREED_WITH_PREVIOUS',
                originalDecision: firstDecision,
                timestamp: new Date(),
              },
            },
          }
        );

        return res.status(200).json({
          message: 'Job ID resolved - analysts agreed',
          status: 'resolved',
          finalDecision: firstDecision,
          nextStep: 'sent_to_qsa_dashboard',
        });
      } else if (agrees === false) {
        // Analista discorda - criar conflito
        if (!decision) {
          return res
            .status(400)
            .json({ message: 'Your decision is required when disagreeing' });
        }

        await collection.updateOne(
          { jobId },
          {
            $set: {
              status: 'conflict',
              updatedAt: new Date(),
            },
            $push: {
              decisions: {
                analyst,
                decision,
                timestamp: new Date(),
              },
            },
          }
        );

        return res.status(200).json({
          message: 'Conflict created - different decisions',
          status: 'conflict',
          nextStep: 'sent_to_qsa_for_resolution',
        });
      }
    }

    return res.status(400).json({ message: 'Invalid job state or request' });
  } catch (error) {
    console.error('Submit error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
