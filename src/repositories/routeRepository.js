import { prisma } from "../database/prismaClient.js";

export const routeRepository = {
  async create(data) {
    return prisma.route.create({ data });
  },

  async findById(id) {
    return prisma.route.findUnique({
      where: { id: Number(id) },
      include: {
        van: true,
      },
    });
  },

  async findAllByVan(vanId) {
    return prisma.route.findMany({ where: { van_id: Number(vanId) } });
  },

  async update(id, data) {
    return prisma.route.update({ where: { id: Number(id) }, data });
  },
};
