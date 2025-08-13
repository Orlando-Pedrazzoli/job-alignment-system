// Usuários hardcoded (simples e eficiente)
export const ANALYSTS = [
  'a.a.abreu',
  'a.bergamini.borgueti',
  'a.de.almeida.marcalo',
  'a.de.oliveira.filho',
  'orlando.pedrazzoli',
];

export const QSA_ANALYSTS = [
  'a.luis.pires.pinto',
  'a.muniz.egerland',
  'a.oliveira.cordeiro',
  'afonso.rosa',
];

export function validateUser(username, role) {
  if (role === 'analyst') {
    return ANALYSTS.includes(username);
  }
  if (role === 'qsa') {
    return QSA_ANALYSTS.includes(username);
  }
  return false;
}

export function getUserRole(username) {
  if (ANALYSTS.includes(username)) return 'analyst';
  if (QSA_ANALYSTS.includes(username)) return 'qsa';
  return null;
}
