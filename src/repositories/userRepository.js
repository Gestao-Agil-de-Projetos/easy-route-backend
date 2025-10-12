import { prisma } from "../database/prismaClient.js";

export const userRepository = {
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  create: (data) => prisma.user.create({ data }),
  findById: (id) =>
    prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    }),
};
