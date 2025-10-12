import { authController } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validation/athenticate-validation.js";

export async function authRoutes(app) {
  app.post("/register", {
    preHandler: [validate(registerSchema)],
    schema: {
      description: "Registrar novo usuário",
      tags: ["Auth"],
      body: {
        type: "object",
        required: ["name", "email", "password", "cpf_cnpj"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          phone: { type: "string", nullable: true },
          cpf_cnpj: {
            type: "string",
            pattern: "^\\d{11}$|^\\d{14}$",
            description: "CPF (11 dígitos) ou CNPJ (14 dígitos)",
          },
          role: {
            type: "string",
            enum: ["PASSENGER", "OWNER", "ADMIN"],
            default: "PASSENGER",
          },
        },
      },
      response: {
        201: {
          description: "Usuário criado com sucesso",
          type: "object",
          properties: {
            id: { type: "number" },
            email: { type: "string" },
          },
        },
      },
    },
    handler: (req, reply) => authController.register(req, reply, app),
  });

  app.post("/login", {
    preHandler: [validate(loginSchema)],
    schema: {
      description: "Login do usuário",
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
          description: "Login realizado com sucesso",
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
    handler: (req, reply) => authController.login(req, reply, app),
  });
}
