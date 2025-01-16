// Ki?m tra th?ng tin ??ng nh?p c?a kh?ch h?ng
export async function login(req, res) {
  // L?y th?ng tin ??ng nh?p t? request body
  const { username, password } = req.body;

  // T?m ki?m kh?ch h?ng trong DB
  const customer = await getCustomerByUsername(username);

  // Ki?m tra n?u kh?ch h?ng kh?ng t?n t?i
  if (!customer) {
    return res.status(401).json({ error: 'Sai t?n ??ng nh?p ho?c m?t kh?u' });
  }

  // So s?nh m?t kh?u ?? nh?p v?i m?t kh?u ???c l?u trong DB
  const validPassword = await bcrypt.compare(password, customer.password);

  // Ki?m tra n?u m?t kh?u kh?ng ??ng
  if (!validPassword) {
    return res.status(401).json({ error: 'Sai t?n ??ng nh?p ho?c m?t kh?u' });
  }

  // T?o token JWT
  const token = createJwtToken({ id: customer.id, username: customer.username });

  // Tr? v? token cho client
  return res.status(200).json({ token });
}