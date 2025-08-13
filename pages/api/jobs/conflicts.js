import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('job-alignment');
    const collection = db.collection('job_decisions');

    // Buscar todos os jobs com conflito
    const conflicts = await collection
      .find({
        status: 'conflict',
      })
      .sort({ updatedAt: -1 })
      .toArray();

    // Formatar dados para o frontend
    const formattedConflicts = conflicts.map(job => ({
      id: job.jobId,
      analyst1: job.decisions[0]?.analyst || 'Unknown',
      analyst2: job.decisions[1]?.analyst || 'Unknown',
      decision1: job.decisions[0]?.decision || 'Unknown',
      decision2: job.decisions[1]?.decision || 'Unknown',
      submittedAt: job.updatedAt,
      qsaNotes: job.qsaNotes || '',
      priority: 'Critical', // Todos são críticos como definimos
    }));

    // Calcular métricas simples
    const metrics = {
      totalConflicts: conflicts.length,
      resolvedToday: 0, // Placeholder - pode implementar depois
    };

    return res.status(200).json({
      conflicts: formattedConflicts,
      metrics,
    });
  } catch (error) {
    console.error('Conflicts fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
