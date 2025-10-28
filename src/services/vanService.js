import { vanRepository } from "../repositories/vanRepository.js";

export const vanService = {
  async create(data, ownerId) {
    const existingVan = await vanRepository.findByPlate(data.plate);
    if (existingVan) {
      throw new Error("A van with this plate is already registered.");
    }

    return vanRepository.create(data, ownerId);
  },

  async getById(id) {
    const van = await vanRepository.findById(id);
    if (!van) {
      throw new Error("Van not found.");
    }
    return van;
  },

  async getAllByOwner(ownerId) {
    return vanRepository.findAllByOwner(ownerId);
  },

  async update(id, data, ownerId) {
    const vanExists = await vanRepository.findById(id);
    if (!vanExists) {
      throw new Error("Van not found for update.");
    }

    if (vanExists.owner_id !== ownerId) {
      throw new Error("Permission denied. You are not the owner of this van.");
    }

    return vanRepository.update(id, data);
  },

  async delete(id, ownerId) {
    const van = await vanRepository.findById(id);
    if (!van) {
      throw new Error("Van not found for deletion.");
    }

    if (van.owner_id !== ownerId) {
      throw new Error("Permission denied. You are not the owner of this van.");
    }

    return vanRepository.delete(id);
  },
};
