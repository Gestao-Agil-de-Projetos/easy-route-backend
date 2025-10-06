import { vanService } from '../services/vanService.js';

export const vanController = {

  async create(request, reply) {
    try {

      const ownerId = request.user.id;
      const data = request.body;

      const newVan = await vanService.create(data, ownerId);

      return reply.code(201).send(newVan);
    } catch (error) {
      return reply.code(400).send({ message: error.message });
    }
  },


  async getById(request, reply) {
    try {
      const { id } = request.params;
      const van = await vanService.getById(id);
      return reply.code(200).send(van);
    } catch (error) {
      return reply.code(404).send({ message: error.message });
    }
  },


  async getAllByOwner(request, reply) {
    try {
      const ownerId = request.user.id;
      const vans = await vanService.getAllByOwner(ownerId);
      return reply.code(200).send(vans);
    } catch (error) {
      return reply.code(500).send({ message: 'Erro interno do servidor' });
    }
  },


  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const ownerId = request.user.id;

      const updatedVan = await vanService.update(id, data, ownerId);
      return reply.code(200).send(updatedVan);
    } catch (error) {
      return reply.code(404).send({ message: error.message });
    }
  },


  async delete(request, reply) {
    try {
      const { id } = request.params;
      const ownerId = request.user.id;

      await vanService.delete(id, ownerId);

      return reply.code(204).send();
    } catch (error) {
      return reply.code(404).send({ message: error.message });
    }
  },
};