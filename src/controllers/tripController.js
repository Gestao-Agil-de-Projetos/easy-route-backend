import { tripService } from "../services/tripService.js";
import responses from "../http/responses.js";

export const tripController = {
  async create(request, reply) {
    try {
      const data = request.body;
      const user = request.user;

      const created = await tripService.create(data, user);
      return responses.created(reply, { success: true, data: created });
    } catch (error) {
      if (error.message && error.message.includes("Permission denied")) {
        return responses.forbidden(reply, {
          success: false,
          message: error.message,
        });
      }

      return responses.badRequest(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getById(request, reply) {
    try {
      const { id } = request.params;
      const trip = await tripService.getById(id);

      return responses.ok(reply, { success: true, data: trip });
    } catch (error) {
      return responses.notFound(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getByUserId(request, reply) {
    try {
      const { user_id } = request.params;
      const trip = await tripService.getByUserId(user_id);

      return responses.ok(reply, { success: true, data: trip });
    } catch (error) {
      return responses.notFound(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getByRouteCoordinatesNearby(req, reply) {
    try {
      const { latitude, longitude, radius } = req.query;

      const trips = await tripService.getNearbyTrips({
        latitude: Number(latitude),
        longitude: Number(longitude),
        radius: Number(radius) || 0.25,
      });

      return responses.ok(reply, { success: true, data: trips });
    } catch (error) {
      return responses.badRequest(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getByRouteCoordinates(req, reply) {
    try {
      const { start_name, end_name, date } = req.query;

      const trips = await tripService.getExactTrips({
        start_name,
        end_name,
        date,
      });

      return responses.ok(reply, { success: true, data: trips });
    } catch (error) {
      return responses.badRequest(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getByOwnerAndStatus(req, reply) {
    try {
      const userId = req.user.id;
      const { status } = req.query;

      const statusArray = status ? status.split(",").map((s) => s.trim()) : [];

      const trips = await tripService.getTripsByOwnerAndStatus(
        userId,
        statusArray
      );

      return responses.ok(reply, { success: true, data: trips });
    } catch (error) {
      return responses.badRequest(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getAllByRoute(request, reply) {
    try {
      const { route_id } = request.params;
      const user = request.user;

      const trips = await tripService.getAllByRoute(route_id, user);
      return responses.ok(reply, { success: true, data: trips });
    } catch (error) {
      return responses.notFound(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const user = request.user;

      const updated = await tripService.update(id, data, user);

      if (!updated) {
        return responses.notFound(reply, {
          success: false,
          message: "Trip not found",
        });
      }

      return responses.ok(reply, { success: true, data: updated });
    } catch (error) {
      if (error.message && error.message.includes("Permission denied")) {
        return responses.forbidden(reply, {
          success: false,
          message: error.message,
        });
      }

      return responses.notFound(reply, {
        success: false,
        message: error.message,
      });
    }
  },
};
