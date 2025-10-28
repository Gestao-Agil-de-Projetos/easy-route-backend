import { routeRepository } from "../repositories/routeRepository.js";
import { vanRepository } from "../repositories/vanRepository.js";

export const routeService = {
  async create(data, ownerId) {
    const van = await vanRepository.findById(data.van_id);
    if (!van) throw new Error("Van not found.");
    if (van.owner_id !== ownerId)
      throw new Error("Permission denied. You are not the owner of this van.");

    return routeRepository.create(data);
  },

  async getById(id) {
    const route = await routeRepository.findById(id);
    if (!route) throw new Error("Route not found.");
    return route;
  },

  async getAllByVan(vanId, ownerId) {
    const van = await vanRepository.findById(vanId);
    if (!van) throw new Error("Van not found.");
    if (van.owner_id !== ownerId)
      throw new Error("Permission denied. You are not the owner of this van.");

    return routeRepository.findAllByVan(vanId);
  },

  async update(id, data, ownerId) {
    const existing = await routeRepository.findById(id);
    if (!existing) throw new Error("Route not found for update.");

    const van = await vanRepository.findById(existing.van_id);
    if (!van) throw new Error("Van linked to this route not found.");
    if (van.owner_id !== ownerId)
      throw new Error("Permission denied. You are not the owner of this van.");

    return routeRepository.update(id, data);
  },
};
