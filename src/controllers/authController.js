import { userRepository } from "../repositories/userRepository.js";
import { authService } from "../services/authService.js";
import http from "../http/responses.js";

export const authController = {
  register: async (request, reply, app) => {
    try {
      const data = await authService.register(request.body, userRepository, app);
      return http.created(reply, data);
    } catch (err) {
      if (err.name === "ValidationError") {
        return http.unprocessableEntity(reply, { errors: err.errors });
      }
      return http.badRequest(reply, { error: err.message });
    }
  },

  login: async (request, reply, app) => {
    try {
      const data = await authService.login(request.body, userRepository, app);
      return http.ok(reply, data);
    } catch (err) {
      if (err.name === "ValidationError") {
        return http.unprocessableEntity(reply, { errors: err.errors });
      }
      return http.unauthenticated(reply, err.message);
    }
  },
};
