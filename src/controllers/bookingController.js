import { bookingService } from "../services/bookingService.js";
import responses from "../http/responses.js";

export const bookingController = {
  async create(request, reply) {
    try {
      const data = request.body;
      const result = await bookingService.create(data);
      return responses.created(reply, {
        success: true,
        message: "Booking criado com sucesso",
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
        message: err.message || "Erro interno do servidor",
      });
    }
  },

  async getAll(request, reply) {
    try {
      const result = await bookingService.getAll();
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
      const result = await bookingService.getById(Number(id));

      if (!result) {
        return responses.notFound(reply, {
          success: false,
          message: "Booking não encontrado",
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
      const result = await bookingService.update(Number(id), data);

      return responses.ok(reply, {
        success: true,
        message: "Booking atualizado com sucesso",
        data: result,
      });
    } catch (err) {
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  async remove(request, reply) {
    try {
      const { id } = request.params;
      await bookingService.remove(Number(id));

      return responses.deleted(reply);
    } catch (err) {
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },
};
