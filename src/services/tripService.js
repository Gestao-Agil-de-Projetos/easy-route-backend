import { tripRepository } from "../repositories/tripRepository.js";
import { routeRepository } from "../repositories/routeRepository.js";

export const tripService = {
  async create(data, user) {
    const route = await routeRepository.findById(data.route_id);
    if (!route) throw new Error("Route not found.");

    if (route.van.owner_id !== user.id)
      throw new Error("Permission denied. You are not the owner of this van.");

    if (!route.is_active) throw new Error("The route is inactive.");

    return tripRepository.create(data, route);
  },

  async getById(id) {
    const trip = await tripRepository.findById(id);
    if (!trip) throw new Error("Trip not found.");
    return trip;
  },

  async getByUserId(userId) {
    const trip = await tripRepository.findByUserId(userId);
    if (!trip) throw new Error("Trip not found.");
    return trip;
  },

  async getNearbyTrips({ latitude, longitude, radius }) {
    if (!latitude || !longitude) {
      throw new Error("Latitude and longitude are required.");
    }

    return tripRepository.findNearby(latitude, longitude, radius);
  },

  async getExactTrips({
    start_latitude,
    start_longitude,
    end_latitude,
    end_longitude,
    date,
  }) {
    if (
      start_latitude == null ||
      start_longitude == null ||
      end_latitude == null ||
      end_longitude == null ||
      date == null
    ) {
      throw new Error("All coordinates are required.");
    }

    return tripRepository.findExact(
      start_latitude,
      start_longitude,
      end_latitude,
      end_longitude,
      date
    );
  },

  async getTripsByOwnerAndStatus(userId, statusArray) {
    if (!userId) throw new Error("User not authenticated.");

    return tripRepository.findByOwnerAndStatus(userId, statusArray);
  },

  async getAllByRoute(routeId, user) {
    const route = await routeRepository.findById(routeId);
    if (!route) throw new Error("Route not found.");
    return tripRepository.findAllByRoute(routeId);
  },

  async update(id, data, user) {
    const existing = await tripRepository.findById(id);
    if (!existing) throw new Error("Trip not found for update.");

    const route = await routeRepository.findById(existing.route_id);
    if (!route) throw new Error("Route linked to this trip not found.");

    if (route.van.owner_id !== user.id)
      throw new Error("Permission denied. You are not the owner of this van.");

    return tripRepository.update(id, data);
  },

  async delete(id, user) {
    const existing = await tripRepository.findById(id);
    if (!existing) throw new Error("Trip not found for deletion.");

    const route = await routeRepository.findById(existing.route_id);
    if (!route) throw new Error("Route linked to this trip not found.");

    if (route.van.owner_id !== user.id)
      throw new Error("Permission denied. You are not the owner of this van.");

    return tripRepository.delete(id);
  },
};
