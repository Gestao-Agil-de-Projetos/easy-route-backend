import { tripService } from '../services/tripService.js';
import http from '../http/responses.js';

export const tripController = {
  async create(request, reply) {
    try {
      const data = request.body;
      const user = request.user;

      const created = await tripService.create(data, user);
      return http.created(reply, created);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) return http.forbidden(reply, { message: error.message });
      return http.badRequest(reply, { message: error.message });
    }
  },

  async getById(request, reply) {
    try {
      const { id } = request.params;
      const trip = await tripService.getById(id);
      return http.ok(reply, trip);
    } catch (error) {
      return http.notFound(reply, { message: error.message });
    }
  },

  async getAllByRoute(request, reply) {
    try {
      const { route_id } = request.params;
      const user = request.user;
      const trips = await tripService.getAllByRoute(route_id, user);
      return http.ok(reply, trips);
    } catch (error) {
      return http.notFound(reply, { message: error.message });
    }
  },

  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const user = request.user;

      const updated = await tripService.update(id, data, user);
      return http.ok(reply, updated);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) return http.forbidden(reply, { message: error.message });
      return http.notFound(reply, { message: error.message });
    }
  },

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const user = request.user;

      await tripService.delete(id, user);
      return http.deleted(reply);
    } catch (error) {
      if (error.message && error.message.includes('Permissão negada')) return http.forbidden(reply, { message: error.message });
      return http.notFound(reply, { message: error.message });
    }
  },
};
