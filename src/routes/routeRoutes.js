import { routeController } from "../controllers/routeController.js";
import { hasRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  createRouteSchema,
  updateRouteSchema,
} from "../validation/route-validation.js";

export async function routeRoutes(app) {
  app.get("/routes/:van_id", {
    preHandler: [app.authenticate],
    schema: {
      summary: "List routes of a specific van",
      description: "List routes of a specific van",
      tags: ["Routes"],
      params: { type: "object", properties: { van_id: { type: "number" } } },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
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
          },
        },
        403: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        404: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        500: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: routeController.getAllByVan,
  });

  app.get("/routes/:id/by-id", {
    preHandler: [app.authenticate],
    schema: {
      summary: "Get route by ID",
      description: "Get route by ID",
      tags: ["Routes"],
      params: { type: "object", properties: { id: { type: "number" } } },
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "object",
              properties: {
                id: { type: "number" },
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
        },
        404: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        500: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: routeController.getById,
  });

  app.post("/routes", {
    preHandler: [app.authenticate, hasRole(["OWNER"]), validate(createRouteSchema)],
    schema: {
      summary: "Create a new route",
      description: "Create a new route",
      tags: ["Routes"],
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
      response: {
        201: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "object",
              properties: {
                id: { type: "number" },
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
        },
        400: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        403: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        500: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: routeController.create,
  });

  app.patch("/routes/:id", {
    preHandler: [app.authenticate, hasRole(["OWNER"]), validate(updateRouteSchema)],
    schema: {
      summary: "Update an existing route",
      description: "Update an existing route",
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
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "object",
              properties: {
                id: { type: "number" },
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
        },
        400: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        403: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        404: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        500: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: routeController.update,
  });
}
