import { vanService } from '../services/vanService.js';
import http from '../http/responses.js';

export const vanController = {

  async create(request, reply) {
    try {

      const ownerId = request.user.id;
      const data = request.body;

      const newVan = await vanService.create(data, ownerId);

      return http.created(reply, newVan);
    } catch (error) {
      return http.badRequest(reply, { message: error.message });
    }
  },


  async getById(request, reply) {
    try {
      const { id } = request.params;
      const van = await vanService.getById(id);
      if (!van) return http.notFound(reply);
      return http.ok(reply, van);
    } catch (error) {
      return http.notFound(reply, { message: error.message });
    }
  },


  async getAllByOwner(request, reply) {
    try {
      const ownerId = request.user.id;
      const vans = await vanService.getAllByOwner(ownerId);
      return http.ok(reply, vans);
    } catch (error) {
      return http.serverError(reply, { message: 'Erro interno do servidor' });
    }
  },


  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const ownerId = request.user.id;

      const updatedVan = await vanService.update(id, data, ownerId);
      if (!updatedVan) return http.notFound(reply);
      return http.ok(reply, updatedVan);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) {
        return http.forbidden(reply, { message: error.message });
      }
      return http.notFound(reply, { message: error.message });
    }
  },


  async delete(request, reply) {
    try {
      const { id } = request.params;
      const ownerId = request.user.id;

      await vanService.delete(id, ownerId);

      return http.deleted(reply);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) {
        return http.forbidden(reply, { message: error.message });
      }
      return http.notFound(reply, { message: error.message });
    }
  },
};