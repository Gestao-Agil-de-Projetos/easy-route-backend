import { bookingRepository } from "../repositories/bookingRepository.js";
import { tripRepository } from "../repositories/tripRepository.js";

export const bookingService = {
  async create(data, loggedUser) {
    return bookingRepository.createWithStopPoint(data, loggedUser);
  },

  async getById(id, userId) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new Error("Booking not found.");

    if (
      booking.trip.route.van.owner_id !== userId &&
      booking.user_id !== userId
    ) {
      throw new Error("Unauthorized access to booking.");
    }

    return booking;
  },

  async getAll(tripId, ownerId) {
    const trip = await tripRepository.findById(tripId);

    if (trip.route.van.owner_id !== ownerId) {
      throw new Error("You are not allowed to view these bookings.");
    }

    return await bookingRepository.findAll(trip.id);
  },

  async getByUserId(user_id, statuses) {
    return bookingRepository.findByUserId(user_id, statuses);
  },

  async update(id, data, userId) {
    const existing = await bookingRepository.findById(id);
    if (!existing) throw new Error("Booking not found for update.");

    if (
      existing.trip.route.van.owner_id !== userId &&
      existing.user_id !== userId
    ) {
      throw new Error("Unauthorized access to booking.");
    }

    if (existing.status !== "PENDING") {
      data = data.status ? { status: data.status } : {};
    }

    return bookingRepository.updateWithStopPoint(id, data);
  },
};

