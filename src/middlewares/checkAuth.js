
export async function checkAuth(request, reply) {
  try {

    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ message: "Token de autenticação inválido ou ausente." });
  }
}