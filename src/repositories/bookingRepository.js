import { prisma } from '../database/prismaClient.js';

export const bookingRepository = {
  create(data) {
    return prisma.booking.create({ data });
  },

  findById(id) {
    return prisma.booking.findUnique({ where: { id: Number(id) } });
  },

  findAll(filter = {}) {
    return prisma.booking.findMany({ where: filter, orderBy: { date: 'asc' } });
  },

  update(id, data) {
    return prisma.booking.update({ where: { id: Number(id) }, data });
  },

  delete(id) {
    return prisma.booking.delete({ where: { id: Number(id) } });
  },

  findByIdAndUser(id, userId) {
    return prisma.booking.findFirst({ where: { id: Number(id), userId: Number(userId) } });
  }
};
