export function authMiddleware(app) {
  app.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
}

export async function checkOwner(request, reply) {
  const userRole = request.user && request.user.role;

  if (userRole !== 'OWNER') {
    return reply.code(403).send({ message: 'Acesso negado. Esta ação é permitida apenas para usuários do tipo OWNER.' });
  }
}