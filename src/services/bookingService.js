import { bookingRepository } from '../repositories/bookingRepository.js';

export const bookingService = {
  async create(data) {
    return bookingRepository.create(data);
  },

  async getById(id) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new Error('Booking não encontrado.');
    return booking;
  },

  async getAll(filter = {}) {
    return bookingRepository.findAll(filter);
  },

  async update(id, data) {
    const existing = await bookingRepository.findById(id);
    if (!existing) throw new Error('Booking não encontrado para atualização.');
    return bookingRepository.update(id, data);
  },

  async remove(id) {
    const existing = await bookingRepository.findById(id);
    if (!existing) throw new Error('Booking não encontrado para deleção.');
    return bookingRepository.delete(id);
  },

  async getByIdAndUser(id, userId) {
    return bookingRepository.findByIdAndUser(id, userId);
  }
};
