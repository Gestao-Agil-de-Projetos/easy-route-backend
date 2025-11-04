export function authMiddleware(app) {
  app.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401).send({ error: "Unauthorized" });
    }
  });
}

export function hasRole(requiredRoles) {
  return async function (request, reply) {
    const userRole = request.user && request.user.role;

    const roles = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!userRole || !roles.includes(userRole)) {
      return reply.code(403).send({
        message: `Access denied. This action is only allowed for users with one of the following roles: ${roles.join(
          ", "
        )}.`,
      });
    }
  };
}
