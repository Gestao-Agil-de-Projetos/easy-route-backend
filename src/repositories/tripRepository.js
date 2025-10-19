import { prisma } from '../database/prismaClient.js';

export const tripRepository = {
  async create(data) {
    return prisma.trip.create({ data });
  },

  async findById(id) {
    return prisma.trip.findUnique({ where: { id: Number(id) } });
  },

  async findAll() {
    return prisma.trip.findMany();
  },

  async findAllByRoute(routeId) {
    return prisma.trip.findMany({ where: { route_id: Number(routeId) } });
  },

  async update(id, data) {
    return prisma.trip.update({ where: { id: Number(id) }, data });
  },

  async delete(id) {
    return prisma.trip.delete({ where: { id: Number(id) } });
  },
};
