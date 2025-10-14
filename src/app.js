import { fastify } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { envs, isDev } from "./utils/envs.js";
import { authMiddleware } from "./middlewares/auth.js";
import { authRoutes } from "./routes/authRoutes.js";
import { vanRoutes } from "./routes/vanRoutes.js";
import { routeRoutes } from "./routes/routeRoutes.js";
import { tripRoutes } from "./routes/tripRoutes.js";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(__dirname, "../prisma/generated/json-schema/json-schema.json");
const prismaSchemas = JSON.parse(readFileSync(schemaPath, "utf8"));

const app = fastify({
  logger: { level: isDev() ? "info" : "warn" },
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

export { app };
