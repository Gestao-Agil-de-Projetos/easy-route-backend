import { routeRepository } from "../repositories/routeRepository.js";
import requests from "../http/requests.js";

export const optimizeRouteService = {
  async optimize(routeId, ownerId) {
    const route = await routeRepository.findWithVanAndStopPoints(routeId);
    if (!route) throw new Error("Rota não encontrada.");

    if (route.van.owner_id !== ownerId)
      throw new Error("Permissão negada. Você não é o proprietário desta van.");

    const stopPoints = route.stop_points || [];
    if (stopPoints.length === 0)
      throw new Error("Rota sem pontos de parada.");

    // Localização inicial e final
    const start = {
      location_id: `start_${route.id}`,
      lat: Number(route.start_latitude),
      lon: Number(route.start_longitude),
    };

    const end = {
      location_id: `end_${route.id}`,
      lat: Number(route.end_latitude),
      lon: Number(route.end_longitude),
    };

    // Montagem dos serviços (paradas)
    const services = stopPoints.map((sp, idx) => ({
      id: `stop_${sp.id}`,
      name: sp.description || `Parada ${idx + 1}`,
      address: {
        location_id: `addr_${sp.id}`,
        lat: Number(sp.latitude),
        lon: Number(sp.longitude),
      },
    }));

    const vehicleTypeId = "van_type";

    const vehicles = [
      {
        vehicle_id: `vehicle_${route.van_id}`,
        type_id: vehicleTypeId,
        start_address: start,
        end_address: end,
      },
    ];

    const vehicle_types = [
      {
        type_id: vehicleTypeId,
        profile: "car",
        capacity: [route.van.capacity ?? 10],
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
