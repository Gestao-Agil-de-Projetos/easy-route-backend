import http from "../http/responses.js";
import { optimizeRouteService } from "../services/optimizeRouteService.js";

export const optimizeRouteController = {
  async optimize(request, reply) {
    try {
      const { routeId } = request.params;
      const ownerId = request.user.id;

      const optimized = await optimizeRouteService.optimize(routeId, ownerId);
      return http.ok(reply, optimized);
    } catch (error) {
      if (error.message.includes("Permissão negada"))
        return http.forbidden(reply, { message: error.message });

      if (
        error.message.includes("Rota não encontrada") ||
        error.message.includes("sem pontos")
      )
        return http.notFound(reply, { message: error.message });

      return http.badRequest(reply, { message: error.message });
    }
  },
};
