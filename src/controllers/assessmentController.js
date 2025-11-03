import { assessmentService } from "../services/assessmentService.js";
import responses from "../http/responses.js";

export const assessmentController = {
  async create(request, reply) {
    try {
      const data = request.body;

      const newVan = await assessmentService.create(data);

      return responses.created(reply, { success: true, data: newVan });
    } catch (error) {
      return responses.badRequest(reply, {
        success: false,
        message: error.message,
      });
    }
  },
};
