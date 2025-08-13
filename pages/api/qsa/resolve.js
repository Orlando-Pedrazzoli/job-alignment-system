import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { jobId, action, notes } = req.body;

  if (!jobId || !action) {
    return res.status(400).json({ message: 'Job ID and action are required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('job-alignment');
    const collection = db.collection('job_decisions');

    if (action === 'delete') {
      // Deletar permanentemente da base de dados
      const result = await collection.deleteOne({ jobId });

      if (result.deletedCount === 1) {
        return res.status(200).json({
          message: 'Job permanently deleted from database',
          action: 'deleted',
        });
      } else {
        return res.status(404).json({ message: 'Job not found' });
      }
    } else if (action === 'pending') {
      // Adicionar notas (manter para compatibilidade futura)
      await collection.updateOne(
        { jobId },
        {
          $set: {
            qsaNotes: notes || '',
            updatedAt: new Date(),
          },
        }
      );

      return res.status(200).json({
        message: 'Notes added to job',
        action: 'updated',
      });
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error) {
    console.error('Resolve error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
