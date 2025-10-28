import requests from "../http/requests.js";
import { tripRepository } from "../repositories/tripRepository.js";

export const optimizeRouteService = {
  async optimize(tripId, ownerId) {
    const trip = await tripRepository.findWithVanAndStopPoints(tripId);
    if (!trip) throw new Error("Trip not found.");

    if (trip.route.van.owner_id !== ownerId)
      throw new Error("Permission denied. You are not the owner of this van.");

    const stopPoints = trip.stop_points || [];
    if (stopPoints.length === 0) throw new Error("Route has no stop points.");

    // Initial and final location
    const start = {
      location_id: `start_${trip.route.id}`,
      lat: Number(trip.route.start_latitude),
      lon: Number(trip.route.start_longitude),
    };

    const end = {
      location_id: `end_${trip.route.id}`,
      lat: Number(trip.route.end_latitude),
      lon: Number(trip.route.end_longitude),
    };

    // Building service points (stops)
    const services = stopPoints.map((sp, idx) => ({
      id: `stop_${sp.id}`,
      name: sp.description || `Stop ${idx + 1}`,
      address: {
        location_id: `addr_${sp.id}`,
        lat: Number(sp.latitude),
        lon: Number(sp.longitude),
      },
    }));

    const vehicleTypeId = "van_type";

    const vehicles = [
      {
        vehicle_id: `vehicle_${trip.route.van_id}`,
        type_id: vehicleTypeId,
        start_address: start,
        end_address: end,
      },
    ];

    const vehicle_types = [
      {
        type_id: vehicleTypeId,
        profile: "car",
        capacity: [trip.route.van.capacity ?? 10],
      },
    ];

    const payload = {
      vehicles,
      vehicle_types,
      services,
      objectives: [
        {
          type: "min",
          value: "transport_time",
        },
      ],
    };

    return await requests.GraphHopperRouteOptimize(payload);
  },
};
