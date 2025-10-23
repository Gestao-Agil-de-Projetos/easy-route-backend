import { stopPointsRepository } from '../repositories/stopPointsRepository.js';
import {
  createStopPointSchema,
  updateStopPointSchema,
} from '../validation/stop-points-validation.js';

export const stopPointsService = {
  async create(data) {
    await createStopPointSchema.validate(data, { abortEarly: false });
    return stopPointsRepository.create(data);
  },

  async getById(id) {
    const stopPoint = await stopPointsRepository.findById(id);
    if (!stopPoint) throw new Error('StopPoint não encontrado.');
    return stopPoint;
  },

  async getAll() {
    return stopPointsRepository.findAll();
  },

  async update(id, data) {
    await updateStopPointSchema.validate(data, { abortEarly: false });
    const existing = await stopPointsRepository.findById(id);
    if (!existing) throw new Error('StopPoint não encontrado para atualização.');
    return stopPointsRepository.update(id, data);
  },

  async delete(id) {
    const existing = await stopPointsRepository.findById(id);
    if (!existing) throw new Error('StopPoint não encontrado para deleção.');
    return stopPointsRepository.delete(id);
  },
};
