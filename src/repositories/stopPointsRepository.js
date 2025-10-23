import { prisma } from '../database/prismaClient.js';

export const stopPointsRepository = {
  async create(data) {
    return prisma.stopPoint.create({ data });
  },

  async findById(id) {
    return prisma.stopPoint.findUnique({
      where: { id: Number(id) },
      include: { route: true }, 
    });
  },

  async findAll() {
    return prisma.stopPoint.findMany({
      include: { route: true }, 
    });
  },

  async update(id, data) {
    return prisma.stopPoint.update({
      where: { id: Number(id) },
      data,
    });
  },

  async delete(id) {
    return prisma.stopPoint.delete({
      where: { id: Number(id) },
    });
  },
};
