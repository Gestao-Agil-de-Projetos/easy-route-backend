import { bookingService } from "../services/bookingService.js";
import responses from "../http/responses.js";

export const bookingController = {
  async create(request, reply) {
    try {
      const data = request.body;
      const loggedUser = request.user;
      const result = await bookingService.create(data, loggedUser);

      return responses.created(reply, {
        success: true,
        message: "Booking and StopPoint successfully created",
        data: result,
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        const errors = (err.inner || []).map((e) => ({
          path: e.path,
          message: e.message,
        }));
        return responses.unprocessableEntity(reply, {
          success: false,
          errors,
        });
      }

      return responses.internalServerError(reply, {
        success: false,
        message: err.message || "Internal server error",
      });
    }
  },

  async getAll(request, reply) {
    try {
      const { trip_id } = request.params;
      const userId = request.user.id;
      const result = await bookingService.getAll(trip_id, userId);
      return responses.ok(reply, {
        success: true,
        data: result,
      });
    } catch (err) {
      return responses.internalServerError(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async getById(request, reply) {
    try {
      const { id } = request.params;
      const user_id = request.user.id;

      const result = await bookingService.getById(Number(id), user_id);

      if (!result) {
        return responses.notFound(reply, {
          success: false,
          message: "Booking not found",
        });
      }

      return responses.ok(reply, {
        success: true,
        data: result,
      });
    } catch (err) {
      return responses.internalServerError(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async getByUserId(request, reply) {
    try {
      const user_id = request.user.id;
      const { status } = request.query;

      const statuses = status
        ? status.split(",").map((s) => s.trim().toUpperCase())
        : null;

      const result = await bookingService.getByUserId(user_id, statuses);

      if (!result || result.length === 0) {
        return responses.ok(reply, {
          success: true,
          data: [],
          message: "No bookings found",
        });
      }

      return responses.ok(reply, {
        success: true,
        data: result,
      });
    } catch (err) {
      return responses.internalServerError(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const userId = request.user.id;
      const result = await bookingService.update(Number(id), data, userId);

      return responses.ok(reply, {
        success: true,
        message: "Booking successfully updated",
        data: result,
      });
    } catch (err) {
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },
};
