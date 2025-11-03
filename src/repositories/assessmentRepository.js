import { prisma } from "../database/prismaClient.js";

export const assessmentRepository = {
  async findByTripAndBooking(trip_id, booking_id) {
    return prisma.assessment.findFirst({
      where: {
        trip_id: Number(trip_id),
        booking_id: Number(booking_id),
      },
    });
  },
  
  async create(data) {
    return prisma.assessment.create({
      data: {
        trip_id: data.trip_id,
        booking_id: data.booking_id,
        rating: data.rating,
        feedback: data.feedback,
      },
    });
  },
};
