import responses from "../http/responses.js";
import { optimizeRouteService } from "../services/optimizeRouteService.js";

export const optimizeRouteController = {
  async optimize(request, reply) {
    try {
      const { trip_id } = request.params;
      const ownerId = request.user.id;

      const optimized = await optimizeRouteService.optimize(trip_id, ownerId);
      return responses.ok(reply, { success: true, data: optimized });
    } catch (error) {
      if (error.message.includes("Permission denied")) {
        return responses.forbidden(reply, {
          success: false,
          message: error.message,
        });
      }

      if (
        error.message.includes("Route not found") ||
        error.message.includes("without points")
      ) {
        return responses.notFound(reply, {
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
};
