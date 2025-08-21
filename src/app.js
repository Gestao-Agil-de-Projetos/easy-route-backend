import { fastify } from "fastify";
import { isDev, envs } from "./utils/envs.js";

const app = fastify({
  logger: { level: isDev() ? "info" : "warn" },
});

export { app };
