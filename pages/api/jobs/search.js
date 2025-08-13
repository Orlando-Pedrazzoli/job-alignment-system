import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { jobId } = req.query;

  if (!jobId) {
    return res.status(400).json({ message: 'Job ID is required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('job-alignment');
    const collection = db.collection('job_decisions');

    // Buscar job existente
    const job = await collection.findOne({ jobId });

    if (!job) {
      // Job não existe - primeira análise
      return res.status(200).json({
        status: 'new',
        message: 'New Job ID - proceed with analysis',
      });
    }

    if (job.status === 'resolved' || job.status === 'conflict') {
      // Job já foi finalizado
      return res.status(200).json({
        status: 'completed',
        finalDecision: job.finalDecision,
        jobStatus: job.status,
        message: 'Job ID already completed',
      });
    }

    if (job.status === 'pending' && job.decisions.length === 1) {
      // Segunda análise - mostrar decisão anterior
      const firstDecision = job.decisions[0];
      return res.status(200).json({
        status: 'second_analysis',
        firstAnalyst: firstDecision.analyst,
        firstDecision: firstDecision.decision,
        timestamp: firstDecision.timestamp,
        message: 'Previous analysis found - confirmation needed',
      });
    }

    // Fallback
    return res.status(200).json({
      status: 'unknown',
      message: 'Unknown job status',
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
