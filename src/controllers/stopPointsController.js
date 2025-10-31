import { stopPointsService } from "../services/stopPointsService.js";
import responses from "../http/responses.js";

export const stopPointsController = {
  async getAll(req, reply) {
    try {
      const { trip_id } = req.params;
      const user = req.user;
      const results = await stopPointsService.getAll(trip_id, user.id);
      return responses.ok(reply, { success: true, data: results });
    } catch (err) {
      return responses.serverError(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async getById(req, reply) {
    try {
      const { id } = req.params;
      const user = req.user;
      const result = await stopPointsService.getById(
        Number(id),
        Number(user.id)
      );

      return responses.ok(reply, { success: true, data: result });
    } catch (err) {
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },
};
