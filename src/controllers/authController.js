import { userRepository } from "../repositories/userRepository.js";
import { authService } from "../services/authService.js";
import responses from "../http/responses.js";

export const authController = {
  register: async (request, reply, app) => {
    try {
      const data = await authService.register(request.body, userRepository);
      return responses.created(reply, { success: true, data });
    } catch (err) {
      if (err.name === "ValidationError") {
        return responses.unprocessableEntity(reply, {
          success: false,
          errors: err.errors,
        });
      }
      return responses.badRequest(reply, {
        success: false,
        message: err.message,
      });
    }
  },

  login: async (request, reply, app) => {
    try {
      const data = await authService.login(request.body, userRepository, app);
      return responses.ok(reply, { success: true, data });
    } catch (err) {
      if (err.name === "ValidationError") {
        return responses.unprocessableEntity(reply, {
          success: false,
          errors: err.errors,
        });
      }
      return responses.unauthenticated(reply, err.message);
    }
  },
};
