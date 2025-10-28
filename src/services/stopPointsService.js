import { stopPointsRepository } from '../repositories/stopPointsRepository.js';

export const stopPointsService = {
  async getById(id, userId) {
    const stopPoint = await stopPointsRepository.findById(id, userId);
    if (!stopPoint) throw new Error('StopPoint not found.');
    return stopPoint;
  },

  async getAll(tripId, ownerId) {
    return stopPointsRepository.findAll(tripId, ownerId);
  },
};
