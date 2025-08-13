import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('job-alignment');
    const collection = db.collection('job_decisions');

    // Buscar todos os jobs resolved e conflict
    const jobs = await collection
      .find({
        status: { $in: ['resolved', 'conflict'] },
      })
      .sort({ updatedAt: -1 })
      .toArray();

    // Formatar dados para o frontend
    const formattedJobs = jobs.map(job => {
      const analysts = job.decisions.map(d => d.analyst);
      const firstDecision = job.decisions[0];
      const secondDecision = job.decisions[1];

      return {
        id: job.jobId,
        status: job.status, // 'resolved' ou 'conflict'
        analysts: analysts,
        analyst1: firstDecision?.analyst || 'Unknown',
        analyst2: secondDecision?.analyst || 'Unknown',
        decision1: firstDecision?.decision || 'Unknown',
        decision2:
          secondDecision?.decision ||
          secondDecision?.originalDecision ||
          'AGREED_WITH_PREVIOUS',
        finalDecision: job.finalDecision || 'Pending Resolution',
        submittedAt: job.updatedAt,
        createdAt: job.createdAt,
        qsaNotes: job.qsaNotes || '',
        priority: 'Critical',
      };
    });

    // Separar resolved e conflicts
    const resolvedJobs = formattedJobs.filter(job => job.status === 'resolved');
    const conflictJobs = formattedJobs.filter(job => job.status === 'conflict');

    // Calcular métricas com timestamps
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const resolvedToday = resolvedJobs.filter(job => {
      const jobDate = new Date(job.submittedAt);
      return jobDate >= today && jobDate < tomorrow;
    }).length;

    const metrics = {
      totalResolved: resolvedJobs.length,
      totalConflicts: conflictJobs.length,
      resolvedToday: resolvedToday,
      pendingConflicts: conflictJobs.length,
    };

    return res.status(200).json({
      resolvedJobs,
      conflictJobs,
      allJobs: formattedJobs,
      metrics,
    });
  } catch (error) {
    console.error('Dashboard fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
