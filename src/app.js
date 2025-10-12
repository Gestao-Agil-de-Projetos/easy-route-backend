import { fastify } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { envs, isDev } from "./utils/envs.js";
import { authMiddleware } from "./middlewares/auth.js";
import { authRoutes } from "./routes/authRoutes.js";
import { vanRoutes } from "./routes/vanRoutes.js";
import { routeRoutes } from "./routes/routeRoutes.js";

const app = fastify({
  logger: { level: isDev() ? "info" : "warn" },
});

app.register(fastifyJwt, {
  secret: envs.JWT_SECRET,
});

authMiddleware(app);

app.register(authRoutes);
app.register(vanRoutes);
app.register(routeRoutes);

export { app };
