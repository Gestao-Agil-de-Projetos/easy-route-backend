import { prisma } from "../database/prismaClient.js";

export const tripRepository = {
  async create(data, route) {
    return prisma.trip.create({
      data: {
        start_time: data.start_time,
        estimated_end_time: data.estimated_end_time,
        total_seats: route.van.capacity,
        available_seats: route.van.capacity,
        price: route.base_price,
        status: "SCHEDULED",
        route_id: data.route_id,
      },
    });
  },

  async findById(id) {
    return prisma.trip.findUnique({
      where: { id: Number(id) },
      include: {
        route: {
          include: {
            van: true,
          },
        },
      },
    });
  },

  async findByUserId(userId) {
    return prisma.trip.findMany({
      where: {
        bookings: {
          some: {
            user_id: Number(userId),
          },
        },
      },
    });
  },

  async findNearby(latitude, longitude, radius = 0.25) {
    return prisma.trip.findMany({
      where: {
        route: {
          start_latitude: {
            gte: latitude - radius,
            lte: latitude + radius,
          },
          start_longitude: {
            gte: longitude - radius,
            lte: longitude + radius,
          },
        },
      },
      include: {
        route: true,
      },
    });
  },

  async findExact(
    start_latitude,
    start_longitude,
    end_latitude,
    end_longitude,
    date
  ) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);

    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);

    return prisma.trip.findMany({
      where: {
        start_time: {
          gte: dayStart,
          lt: dayEnd,
        },
        route: {
          start_latitude,
          start_longitude,
          end_latitude,
          end_longitude,
        },
      },
      include: {
        route: true,
      },
    });
  },

  async findByOwnerAndStatus(userId, statusArray) {
    const whereCondition = {
      route: {
        van: {
          owner_id: userId,
        },
      },
    };

    if (statusArray.length > 0) {
      whereCondition.status = { in: statusArray };
    }

    return prisma.trip.findMany({
      where: whereCondition,
      include: {
        route: {
          include: {
            van: true,
          },
        },
      },
      orderBy: {
        start_time: "desc",
      },
    });
  },

  async findAll() {
    return prisma.trip.findMany();
  },

  async findAllByRoute(routeId) {
    return prisma.trip.findMany({ where: { route_id: Number(routeId) } });
  },

  async update(id, data) {
    return prisma.trip.update({ where: { id: Number(id) }, data });
  },

  async findWithVanAndStopPoints(id) {
    return await prisma.trip.findUnique({
      where: { id: Number(id) },
      include: {
        stop_points: true,
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
    });
  },
};
