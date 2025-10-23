import { stopPointsService } from "../services/stopPointsService.js";
import responses from "../http/responses.js";

export const stopPointsController = {
  async create(req, reply) {
    try {
      const data = req.body;
      const result = await stopPointsService.create(data);
      return responses.created(reply, { success: true, data: result });
    } catch (err) {
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async getAll(req, reply) {
    try {
      const results = await stopPointsService.getAll();
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
      const result = await stopPointsService.getById(Number(id));
      if (!result)
        return responses.notFound(reply, {
          success: false,
          message: "StopPoint não encontrado",
        });
      return responses.ok(reply, { success: true, data: result });
    } catch (err) {
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async update(req, reply) {
    try {
      const { id } = req.params;
      const data = req.body;
      const result = await stopPointsService.update(Number(id), data);
      return responses.ok(reply, {
        success: true,
        message: "StopPoint atualizado",
        data: result,
      });
    } catch (err) {
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async delete(req, reply) {
    try {
      const { id } = req.params;
      await stopPointsService.delete(Number(id));
      return responses.deleted(reply);
    } catch (err) {
      return responses.notFound(reply, {
        success: false,
        message: err.message,
      });
    }
  },
};
