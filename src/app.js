import { fastify } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";

import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { envs, isDev } from "./utils/envs.js";
import { authMiddleware } from "./middlewares/auth.js";
import { authRoutes } from "./routes/authRoutes.js";
import { vanRoutes } from "./routes/vanRoutes.js";
import { routeRoutes } from "./routes/routeRoutes.js";
import { tripRoutes } from "./routes/tripRoutes.js";
import { stopPointsRoutes } from "./routes/stopPointsRoutes.js";
import { bookingRoutes } from "./routes/bookingRoutes.js";
import { optimizeRouteRoutes } from "./routes/optimizeRouteRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(
  __dirname,
  "../prisma/generated/json-schema/json-schema.json"
);
const prismaSchemas = JSON.parse(readFileSync(schemaPath, "utf8"));

const app = fastify({
  logger: { level: isDev() ? "info" : "warn" },
});

await app.register(fastifyCors, {
  origin: envs.FRONTEND_URL,
  credentials: true,
});

await app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: "1 minute",
  ban: 10,
  errorResponseBuilder: (req, context) => ({
    statusCode: 429,
    error: "Too Many Requests",
    message: `Você atingiu o limite de ${context.max} requisições por minuto. Aguarde e tente novamente.`,
  }),
  keyGenerator: (req) => req.ip,
});

await app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Easy Route API",
      version: "1.0.0",
    },
    components: {
      schemas: prismaSchemas.definitions,
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
});

await app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
  initOAuth: {},
  uiConfig: {
    docExpansion: "list",
    deepLinking: false,
  },
});

app.register(fastifyJwt, {
  secret: envs.JWT_SECRET,
});

authMiddleware(app);

app.register(authRoutes);
app.register(vanRoutes);
app.register(routeRoutes);
app.register(tripRoutes);
app.register(optimizeRouteRoutes);
app.register(stopPointsRoutes);
app.register(bookingRoutes);

export { app };
