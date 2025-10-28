import { vanService } from "../services/vanService.js";
import responses from "../http/responses.js";

export const vanController = {
  async create(request, reply) {
    try {
      const ownerId = request.user.id;
      const data = request.body;

      const newVan = await vanService.create(data, ownerId);

      return responses.created(reply, { success: true, data: newVan });
    } catch (error) {
      return responses.badRequest(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getById(request, reply) {
    try {
      const { id } = request.params;
      const van = await vanService.getById(id);

      if (!van) {
        return responses.notFound(reply, {
          success: false,
          message: "Van not found",
        });
      }

      return responses.ok(reply, { success: true, data: van });
    } catch (error) {
      return responses.notFound(reply, {
        success: false,
        message: error.message,
      });
    }
  },

  async getAllByOwner(request, reply) {
    try {
      const ownerId = request.user.id;
      const vans = await vanService.getAllByOwner(ownerId);

      return responses.ok(reply, { success: true, data: vans });
    } catch (error) {
      return responses.serverError(reply, {
        success: false,
        message: "Internal server error",
      });
    }
  },

  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const ownerId = request.user.id;

      const updatedVan = await vanService.update(id, data, ownerId);

      if (!updatedVan) {
        return responses.notFound(reply, {
          success: false,
          message: "Van not found",
        });
      }

      return responses.ok(reply, { success: true, data: updatedVan });
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

  async delete(request, reply) {
    try {
      const { id } = request.params;
      const ownerId = request.user.id;

      await vanService.delete(id, ownerId);

      return responses.deleted(reply, { success: true });
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
