import { routeService } from "../services/routeService.js";
import responses from "../http/responses.js";

export const routeController = {
  async create(request, reply) {
    try {
      const ownerId = request.user.id;
      const data = request.body;

      const newRoute = await routeService.create(data, ownerId);
      return responses.created(reply, { success: true, data: newRoute });
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
      const route = await routeService.getById(id);

      if (!route) {
        return responses.notFound(reply, {
          success: false,
          message: "Route not found",
        });
      }

      return responses.ok(reply, { success: true, data: route });
    } catch (error) {
      return responses.notFound(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getAllByVan(request, reply) {
    try {
      const { van_id } = request.params;
      const ownerId = request.user.id;

      const routes = await routeService.getAllByVan(van_id, ownerId);
      return responses.ok(reply, { success: true, data: routes });
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

  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const ownerId = request.user.id;

      const updated = await routeService.update(id, data, ownerId);

      if (!updated) {
        return responses.notFound(reply, {
          success: false,
          message: "Route not found",
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
