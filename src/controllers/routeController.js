import { routeService } from '../services/routeService.js';
import http from '../http/responses.js';

export const routeController = {
  async create(request, reply) {
    try {
      const ownerId = request.user.id;
      const data = request.body;

      const newRoute = await routeService.create(data, ownerId);
      return http.created(reply, newRoute);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) return http.forbidden(reply, { message: error.message });
      return http.badRequest(reply, { message: error.message });
    }
  },

  async getById(request, reply) {
    try {
      const { id } = request.params;
      const route = await routeService.getById(id);
      return http.ok(reply, route);
    } catch (error) {
      return http.notFound(reply, { message: error.message });
    }
  },

  async getAllByVan(request, reply) {
    try {
      const { van_id } = request.params;
      const ownerId = request.user.id;
      const routes = await routeService.getAllByVan(van_id, ownerId);
      return http.ok(reply, routes);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) return http.forbidden(reply, { message: error.message });
      return http.notFound(reply, { message: error.message });
    }
  },

  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const ownerId = request.user.id;

      const updated = await routeService.update(id, data, ownerId);
      return http.ok(reply, updated);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) return http.forbidden(reply, { message: error.message });
      return http.notFound(reply, { message: error.message });
    }
  },

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const ownerId = request.user.id;

      await routeService.delete(id, ownerId);
      return http.deleted(reply);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) return http.forbidden(reply, { message: error.message });
      return http.notFound(reply, { message: error.message });
    }
  },
};
