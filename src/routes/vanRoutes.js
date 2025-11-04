import { vanController } from "../controllers/vanController.js";
import { hasRole } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  createVanSchema,
  updateVanSchema,
} from "../validation/van-validation.js";

export async function vanRoutes(app) {
  app.get("/vans", {
    preHandler: [app.authenticate, hasRole(["OWNER"])],
    schema: {
      summary: "List all vans of the owner",
      description: "List all vans of the owner",
      tags: ["Vans"],
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
                  plate: { type: "string" },
                  model: { type: "string" },
                  capacity: { type: "number" },
                },
              },
            },
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
    handler: vanController.getAllByOwner,
  });

  app.get("/vans/:id/by-id", {
    preHandler: [app.authenticate],
    schema: {
      summary: "Get van by ID",
      description: "Get van by ID",
      tags: ["Vans"],
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
                plate: { type: "string" },
                model: { type: "string" },
                capacity: { type: "number" },
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
    handler: vanController.getById,
  });

  app.post("/vans", {
    preHandler: [app.authenticate, hasRole(["OWNER"]), validate(createVanSchema)],
    schema: {
      summary: "Create a new van",
      description: "Create a new van",
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
            success: { type: "boolean" },
            data: {
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
    handler: vanController.create,
  });

  app.patch("/vans/:id", {
    preHandler: [app.authenticate, hasRole(["OWNER"]), validate(updateVanSchema)],
    schema: {
      summary: "Update van details",
      description: "Update van details",
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
      response: {
        200: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
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
    handler: vanController.update,
  });

  app.delete("/vans/:id", {
    preHandler: [app.authenticate, hasRole(["OWNER"])],
    schema: {
      summary: "Delete van by ID",
      description: "Delete van by ID",
      tags: ["Vans"],
      params: { type: "object", properties: { id: { type: "number" } } },
      response: {
        204: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
          description: "Van deleted successfully",
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
    handler: vanController.delete,
  });
}
