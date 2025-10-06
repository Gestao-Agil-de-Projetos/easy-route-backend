
export async function checkOwner(request, reply) {

  const userRole = request.user.role;

  if (userRole !== 'OWNER') {
    return reply.code(403).send({ message: 'Acesso negado. Esta ação é permitida apenas para usuários do tipo OWNER.' });
  }
}