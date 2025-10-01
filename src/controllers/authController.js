import { userRepository } from "../repositories/userRepository.js";
import { authService } from "../services/authService.js";
import { registerSchema, loginSchema } from "../validation/athenticate.js";
import http from "../http/responses.js";

export const authController = {
  register: async (request, reply, app) => {
    try {
      const body = await registerSchema.validate(request.body, { abortEarly: false });
      const data = await authService.register(body, userRepository, app);
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
      const body = await loginSchema.validate(request.body, { abortEarly: false });
      const data = await authService.login(body, userRepository, app);
      return http.ok(reply, data);
    } catch (err) {
      if (err.name === "ValidationError") {
        return http.unprocessableEntity(reply, { errors: err.errors });
      }
      return http.unauthenticated(reply, err.message);
    }
  },
};
