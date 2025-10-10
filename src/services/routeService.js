import { routeRepository } from '../repositories/routeRepository.js';
import { vanRepository } from '../repositories/vanRepository.js';

export const routeService = {
  async create(data, ownerId) {
    const van = await vanRepository.findById(data.van_id);
    if (!van) throw new Error('Van não encontrada.');
    if (van.owner_id !== ownerId) throw new Error('Permissão negada. Você não é o proprietário desta van.');

    return routeRepository.create(data);
  },

  async getById(id) {
    const route = await routeRepository.findById(id);
    if (!route) throw new Error('Rota não encontrada.');
    return route;
  },

  async getAllByVan(vanId, ownerId) {
    const van = await vanRepository.findById(vanId);
    if (!van) throw new Error('Van não encontrada.');
    if (van.owner_id !== ownerId) throw new Error('Permissão negada. Você não é o proprietário desta van.');

    return routeRepository.findAllByVan(vanId);
  },

  async update(id, data, ownerId) {
    const existing = await routeRepository.findById(id);
    if (!existing) throw new Error('Rota não encontrada para atualização.');

    const van = await vanRepository.findById(existing.van_id);
    if (!van) throw new Error('Van da rota não encontrada.');
    if (van.owner_id !== ownerId) throw new Error('Permissão negada. Você não é o proprietário desta van.');

    return routeRepository.update(id, data);
  },

  async delete(id, ownerId) {
    const existing = await routeRepository.findById(id);
    if (!existing) throw new Error('Rota não encontrada para deleção.');

    const van = await vanRepository.findById(existing.van_id);
    if (!van) throw new Error('Van da rota não encontrada.');
    if (van.owner_id !== ownerId) throw new Error('Permissão negada. Você não é o proprietário desta van.');

    return routeRepository.delete(id);
  },
};
