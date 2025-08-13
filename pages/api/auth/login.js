import { validateUser } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: 'Username and role are required' });
  }

  // Validar usuário
  const isValid = validateUser(username, role);

  if (isValid) {
    return res.status(200).json({
      success: true,
      user: { username, role },
      redirectTo: role === 'analyst' ? '/analyst' : '/qsa/dashboard',
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials',
    });
  }
}
