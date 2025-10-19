import { tripRepository } from '../repositories/tripRepository.js';
import { routeRepository } from '../repositories/routeRepository.js';

export const tripService = {
  async create(data, user) {
    // Verify route exists
    const route = await routeRepository.findById(data.route_id);
    if (!route) throw new Error('Rota não encontrada.');

    // Only owners of the van can create trips for their routes (business assumption)
    if (user.role !== 'OWNER' && user.role !== 'ADMIN') {
      throw new Error('Permissão negada. Apenas proprietários ou administradores podem criar trips.');
    }

    // additionally verify ownership
    if (user.role === 'OWNER') {
      if (route.van.owner_id !== user.id) throw new Error('Permissão negada. Você não é o proprietário desta van.');
    }

    return tripRepository.create(data);
  },

  async getById(id) {
    const trip = await tripRepository.findById(id);
    if (!trip) throw new Error('Trip não encontrada.');
    return trip;
  },

  async getAllByRoute(routeId, user) {
    // any authenticated user can list trips for a route
    const route = await routeRepository.findById(routeId);
    if (!route) throw new Error('Rota não encontrada.');
    return tripRepository.findAllByRoute(routeId);
  },

  async update(id, data, user) {
    const existing = await tripRepository.findById(id);
    if (!existing) throw new Error('Trip não encontrada para atualização.');

    const route = await routeRepository.findById(existing.route_id);
    if (!route) throw new Error('Rota da trip não encontrada.');

    // Only owner of the van (route.van.owner_id) or admin can update
    if (user.role !== 'ADMIN' && route.van.owner_id !== user.id) {
      throw new Error('Permissão negada. Você não é o proprietário desta van.');
    }

    return tripRepository.update(id, data);
  },

  async delete(id, user) {
    const existing = await tripRepository.findById(id);
    if (!existing) throw new Error('Trip não encontrada para deleção.');

    const route = await routeRepository.findById(existing.route_id);
    if (!route) throw new Error('Rota da trip não encontrada.');

    if (user.role !== 'ADMIN' && route.van.owner_id !== user.id) {
      throw new Error('Permissão negada. Você não é o proprietário desta van.');
    }

    return tripRepository.delete(id);
  },
};
