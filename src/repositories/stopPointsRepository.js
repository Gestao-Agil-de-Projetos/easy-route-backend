import { prisma } from "../database/prismaClient.js";

export const stopPointsRepository = {
  async findById(id, userId) {
    return prisma.stopPoint.findFirst({
      where: {
        id: Number(id),
        OR: [
          { trip: { route: { van: { owner_id: Number(userId) } } } },
          { bookings: { some: { user_id: Number(userId) } } },
        ],
      },
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
        bookings: true,
      },
    });
  },

  async findAll(tripId, ownerId) {
    return prisma.stopPoint.findMany({
      where: {
        trip_id: Number(tripId),
        trip: {
          route: {
            van: {
              owner_id: Number(ownerId),
            },
          },
        },
      },
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
};
