import { prisma } from "../database/prismaClient.js";

export const bookingRepository = {
  async createWithStopPoint(data, loggedUser) {
    const { userId, tripId, stopPoint } = data;

    return prisma.$transaction(async (tx) => {
      const trip = await tx.trip.findFirst({
        where: { id: tripId },
        orderBy: { start_time: "asc" },
        include: {
          route: true,
        },
      });

      if (!trip) throw new Error("No trip found for this route.");

      if (!trip.route.is_active) throw new Error("The Route is not active.");

      if (trip.status !== "SCHEDULED")
        throw new Error("The trip is no longer accepting reservations.");

      if (trip.available_seats === 0)
        throw new Error("No more available seats.");

      const booking = await tx.booking.create({
        data: {
          user_id: loggedUser.role === "OWNER" ? userId : loggedUser.id,
          trip_id: trip.id,
          status: "CONFIRMED", // mocked, no payment validation implemented
        },
      });

      const createdStopPoint = await tx.stopPoint.create({
        data: {
          latitude: stopPoint.latitude,
          longitude: stopPoint.longitude,
          description: stopPoint.description || null,
          trip_id: trip.id,
          booking_id: booking.booking_id,
        },
      });

      await tx.trip.update({
        where: { id: booking.trip_id },
        data: { available_seats: { decrement: 1 } },
      });

      return { booking, stopPoint: createdStopPoint };
    });
  },

  async findLatestWithoutAssessment(user_id) {
    return prisma.booking.findFirst({
      where: {
        user_id,
        status: "FINISHED",
        assessment: {
          is: null,
        },
        trip: {
          status: "FINISHED",
        },
      },
      include: {
        trip: {
          include: {
            route: {
              include: {
                van: {
                  include: {
                    owner: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },

  findById(id) {
    return prisma.booking.findUnique({
      where: { booking_id: Number(id) },
      include: {
        trip: {
          include: {
            route: {
              include: {
                van: true,
              },
            },
          },
        },
      },
    });
  },

  findByUserId(user_id, statuses) {
    const whereCondition = {
      user_id: Number(user_id),
    };

    if (statuses && statuses.length > 0) {
      whereCondition.status = {
        in: statuses,
      };
    }

    return prisma.booking.findMany({
      where: whereCondition,
      include: {
        assessment: true,
        trip: {
          include: {
            route: {
              include: {
                van: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },

  findAll(tripId) {
    return prisma.booking.findMany({
      where: { trip_id: Number(tripId) },
      include: {
        user: true,
        StopPoint: true,
        trip: {
          include: {
            route: true,
          },
        },
      },
    });
  },

  async updateWithStopPoint(id, data) {
    const { stopPoint } = data;

    return prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { booking_id: id },
        include: { trip: true },
      });

      if (!booking) throw new Error("Booking not found.");

      const trip = booking.trip;

      if (!trip) throw new Error("No trip found.");

      if (booking.status === "CANCELLED" || booking.status === "FINISHED")
        throw new Error("This booking can no longer be modified.");

      const updatedStopPoint = await tx.stopPoint.updateMany({
        where: { booking_id: booking.booking_id },
        data: {
          latitude: stopPoint.latitude,
          longitude: stopPoint.longitude,
          description: stopPoint.description || null,
        },
      });

      if (updatedStopPoint.count === 0)
        throw new Error("No StopPoint found to update.");

      const updatedBooking = await tx.booking.update({
        where: { booking_id: booking.booking_id },
        data: {
          trip_id: data.trip_id,
        },
      });

      return {
        booking: updatedBooking,
        stopPoint: updatedStopPoint,
      };
    });
  },
};
