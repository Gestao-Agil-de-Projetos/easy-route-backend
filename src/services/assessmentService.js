import { assessmentRepository } from "../repositories/assessmentRepository.js";
import { bookingRepository } from "../repositories/bookingRepository.js";
import { tripRepository } from "../repositories/tripRepository.js";

export const assessmentService = {
  async create(data) {
    const { trip_id, booking_id } = data;

    const trip = await tripRepository.findById(trip_id);
    if (!trip) {
      throw new Error(`Trip with ID ${trip_id} not found.`);
    }

    const booking = await bookingRepository.findById(booking_id);
    if (!booking) {
      throw new Error(`Booking with ID ${booking_id} not found.`);
    }

    if (trip.status !== "FINISHED") {
      throw new Error(`Trip #${trip_id} is not finished yet.`);
    }

    if (booking.status !== "FINISHED") {
      throw new Error(`Booking #${booking_id} is not finished yet.`);
    }

    const existing = await assessmentRepository.findByTripAndBooking(trip_id, booking_id);
    if (existing) {
      throw new Error(
        `Alredy exists one assessment for trip #${data.trip_id} and booking #${data.booking_id}.`
      );
    }


    const assessment = await assessmentRepository.create({
      trip_id,
      booking_id,
      rating: data.rating,
      feedback: data.feedback,
    });

    return assessment;
  },
};
