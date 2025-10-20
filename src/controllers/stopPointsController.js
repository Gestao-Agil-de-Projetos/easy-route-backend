import { stopPointsService } from '../services/stopPointsService.js';

export const stopPointsController = {
  async create(req, reply) {
    try {
      const data = req.body;
      const result = await stopPointsService.create(data);
      reply.code(201).send(result);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  },

  async getAll(req, reply) {
    const results = await stopPointsService.getAll();
    reply.send(results);
  },

  async getById(req, reply) {
    try {
      const { id } = req.params;
      const result = await stopPointsService.getById(Number(id));
      reply.send(result);
    } catch (err) {
      reply.code(404).send({ error: err.message });
    }
  },

  async update(req, reply) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await stopPointsService.update(Number(id), data);
      reply.send(result);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  },

  async delete(req, reply) {
    try {
      const { id } = req.params;
      await stopPointsService.delete(Number(id));
      reply.code(204).send();
    } catch (err) {
      reply.code(404).send({ error: err.message });
    }
  },
};
