import { vanRepository } from '../repositories/vanRepository.js';

export const vanService = {

  async create(data, ownerId) {
    const existingVan = await vanRepository.findByPlate(data.plate);
    if (existingVan) {
      throw new Error('Já existe uma van cadastrada com esta placa.');
    }

    return vanRepository.create(data, ownerId);
  },


  async getById(id) {
    const van = await vanRepository.findById(id);
    if (!van) {
      throw new Error('Van não encontrada.');
    }
    return van;
  },


  async getAllByOwner(ownerId) {
    return vanRepository.findAllByOwner(ownerId);
  },


  async update(id, data, ownerId) {
    const vanExists = await vanRepository.findById(id);
    if (!vanExists) {
      throw new Error('Van não encontrada para atualização.');
    }

    if (vanExists.owner_id !== ownerId) {
      throw new Error('Permissão negada. Você não é o proprietário desta van.');
    }

    return vanRepository.update(id, data);
  },


  async delete(id, ownerId) {
    const van = await vanRepository.findById(id);
    if (!van) {
      throw new Error('Van não encontrada para deleção.');
    }

    if (van.owner_id !== ownerId) {
      throw new Error('Permissão negada. Você não é o proprietário desta van.');
    }

    return vanRepository.delete(id);
  },
};