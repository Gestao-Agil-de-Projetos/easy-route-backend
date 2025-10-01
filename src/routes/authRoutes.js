import { authController } from "../controllers/authController.js";

export async function authRoutes(app) {
  app.post("/register", async (req, reply) =>
    authController.register(req, reply, app)
  );
  app.post("/login", async (req, reply) =>
    authController.login(req, reply, app)
  );
}
