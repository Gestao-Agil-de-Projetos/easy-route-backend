import { vanController } from "../controllers/vanController.js";
import { checkOwner } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  createVanSchema,
  updateVanSchema,
} from "../validation/van-validation.js";

export async function vanRoutes(app) {
  app.get("/vans", {
    preHandler: [app.authenticate],
    schema: {
      summary: "Listar todas as vans do proprietário",
      description: "Listar todas as vans do proprietário",
      tags: ["Vans"],
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              plate: { type: "string" },
              model: { type: "string" },
              capacity: { type: "number" },
            },
          },
        },
      },
    },
    handler: vanController.getAllByOwner,
  });

  app.get("/vans/:id", {
    preHandler: [app.authenticate],
    schema: {
      summary: "Buscar van pelo ID",
      description: "Buscar van pelo ID",
      tags: ["Vans"],
      params: { type: "object", properties: { id: { type: "number" } } },
    },
    handler: vanController.getById,
  });

  app.post("/vans", {
    preHandler: [app.authenticate, checkOwner, validate(createVanSchema)],
    schema: {
      summary: "Criar nova van",
      description: "Criar nova van",
      tags: ["Vans"],
      body: {
        type: "object",
        required: ["plate", "model", "capacity"],
        properties: {
          plate: { type: "string" },
          model: { type: "string" },
          capacity: { type: "integer", minimum: 1 },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "number" },
            plate: { type: "string" },
            model: { type: "string" },
            capacity: { type: "number" },
          },
        },
      },
    },
    handler: vanController.create,
  });

  app.patch("/vans/:id", {
    preHandler: [app.authenticate, checkOwner, validate(updateVanSchema)],
    schema: {
      summary: "Atualizar dados da van",
      description: "Atualizar dados da van",
      tags: ["Vans"],
      params: { type: "object", properties: { id: { type: "number" } } },
      body: {
        type: "object",
        properties: {
          plate: { type: "string" },
          model: { type: "string" },
          capacity: { type: "integer", minimum: 1 },
        },
      },
    },
    handler: vanController.update,
  });

  app.delete("/vans/:id", {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      summary: "Excluir van pelo ID",
      description: "Excluir van pelo ID",
      tags: ["Vans"],
      params: { type: "object", properties: { id: { type: "number" } } },
      response: { 204: { description: "Van deletada com sucesso" } },
    },
    handler: vanController.delete,
  });
}
