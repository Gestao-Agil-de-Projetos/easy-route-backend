import { authController } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import {
  registerSchema,
  loginSchema,
} from "../validation/athenticate-validation.js";

export async function authRoutes(app) {
  app.post("/register", {
    preHandler: [validate(registerSchema)],
    schema: {
      summary: "Register new user",
      description: "Register a new user",
      tags: ["Auth"],
      body: {
        type: "object",
        required: ["name", "email", "password", "cpf_cnpj"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          phone: { type: "string", nullable: true },
          cpf_cnpj: { type: "string", pattern: "^\\d{11}$|^\\d{14}$" },
          cnh: { type: "string", pattern: "^\\d{11}$", nullable: true },
          role: {
            type: "string",
            enum: ["PASSENGER", "OWNER", "ADMIN"],
            default: "PASSENGER",
          },
        },
      },
      response: {
        201: {
          description: "User created successfully",
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "object",
              properties: {
                id: { type: "number" },
                email: { type: "string" },
              },
            },
          },
        },
        400: {
          description: "Bad request / invalid input",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        422: {
          description: "Validation error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            errors: { type: "array", items: { type: "string" } },
          },
        },
        500: {
          description: "Internal server error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: (req, reply) => authController.register(req, reply, app),
  });

  app.post("/login", {
    preHandler: [validate(loginSchema)],
    schema: {
      summary: "User login",
      description: "User login",
      tags: ["Auth"],
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },
      response: {
        200: {
          description: "Login successful",
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "object",
              properties: {
                token: { type: "string" },
                user: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    email: { type: "string" },
                    role: { type: "string" },
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthenticated / invalid credentials",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        422: {
          description: "Validation error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            errors: { type: "array", items: { type: "string" } },
          },
        },
        500: {
          description: "Internal server error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: (req, reply) => authController.login(req, reply, app),
  });
}
