
export async function ensureOwner(request, reply) {
  try {
    const user = await request.jwtVerify();

    if (user.role !== 'OWNER') {
      return reply.status(403).send({
        message: 'Acesso negado: apenas usuários com papel OWNER podem realizar esta ação.',
      });
    }

    request.user = user;
  } catch (err) {
    return reply.status(401).send({ message: 'Token inválido ou não fornecido.' });
  }
}
