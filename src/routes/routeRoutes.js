import { routeController } from '../controllers/routeController.js';
import { checkOwner } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createRouteSchema, updateRouteSchema } from '../validation/route-validation.js';

export async function routeRoutes(app) {
  app.get("/vans/:van_id/routes", {
    preHandler: [app.authenticate],
    schema: {
      summary: 'Listar rotas de uma van específica',
      description: "Listar rotas de uma van específica",
      tags: ["Routes"],
      params: {
        type: "object",
        properties: { van_id: { type: "number" } },
      },
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "number" },
              name: { type: "string" },
              description: { type: "string" },
              pickup_type: { type: "string" },
              base_price: { type: "number" },
            },
          },
        },
      },
    },
    handler: routeController.getAllByVan,
  });

  app.get("/routes/:id", {
    preHandler: [app.authenticate],
    schema: {
      summary: 'Buscar rota pelo ID',
      description: "Buscar rota pelo ID",
      tags: ["Routes"],
      params: {
        type: "object",
        properties: { id: { type: "number" } },
      },
    },
    handler: routeController.getById,
  });

  app.post("/routes", {
    preHandler: [app.authenticate, checkOwner, validate(createRouteSchema)],
    schema: {
      summary: 'Criar nova rota',
      description: "Criar nova rota",
      tags: ["Routes"],
      body: {
        type: "object",
        required: [
          "name",
          "pickup_type",
          "start_latitude",
          "start_longitude",
          "end_latitude",
          "end_longitude",
          "base_price",
          "van_id",
        ],
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          pickup_type: { type: "string", enum: ["FIXED", "FLEXIBLE"] },
          start_latitude: { type: "number" },
          start_longitude: { type: "number" },
          end_latitude: { type: "number" },
          end_longitude: { type: "number" },
          base_price: { type: "number", minimum: 0 },
          van_id: { type: "number" },
        },
      },
      response: {
        201: {
          type: "object",
          properties: {
            id: { type: "number" },
            name: { type: "string" },
            base_price: { type: "number" },
          },
        },
      },
    },
    handler: routeController.create,
  });

  app.put("/routes/:id", {
    preHandler: [app.authenticate, checkOwner, validate(updateRouteSchema)],
    schema: {
      summary: 'Atualizar rota existente',
      description: "Atualizar rota existente",
      tags: ["Routes"],
      params: { type: "object", properties: { id: { type: "number" } } },
      body: {
        type: "object",
        properties: {
          name: { type: "string" },
          description: { type: "string" },
          pickup_type: { type: "string", enum: ["FIXED", "FLEXIBLE"] },
          start_latitude: { type: "number" },
          start_longitude: { type: "number" },
          end_latitude: { type: "number" },
          end_longitude: { type: "number" },
          base_price: { type: "number", minimum: 0 },
          van_id: { type: "number" },
        },
      },
    },
    handler: routeController.update,
  });

  app.delete("/routes/:id", {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      summary: 'Excluir rota pelo ID',
      description: "Excluir rota pelo ID",
      tags: ["Routes"],
      params: { type: "object", properties: { id: { type: "number" } } },
      response: { 204: { description: "Rota deletada com sucesso" } },
    },
    handler: routeController.delete,
  });
}
