import { prisma } from '../database/prismaClient.js';

export const vanRepository = {

  async create(data, ownerId) {
    return prisma.van.create({
      data: {
        plate: data.plate,
        model: data.model,
        capacity: data.capacity,
        owner_id: ownerId, 
      },
    });
  },


  async findByPlate(plate) {
    return prisma.van.findUnique({ where: { plate } });
  },
  

  async findById(id) {
    return prisma.van.findUnique({ where: { id: Number(id) } });
  },


  async findAllByOwner(ownerId) {
    return prisma.van.findMany({ where: { owner_id: ownerId } });
  },
  

  async update(id, data) {
    return prisma.van.update({
      where: { id: Number(id) },
      data,
    });
  },


  async delete(id) {
    return prisma.van.delete({ where: { id: Number(id) } });
  },
};