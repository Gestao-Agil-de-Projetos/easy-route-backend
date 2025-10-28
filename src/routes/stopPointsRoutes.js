import { stopPointsController } from "../controllers/stopPointsController.js";
import { checkOwner } from "../middlewares/auth.js";

export async function stopPointsRoutes(app) {
  app.get("/stoppoints/:trip_id", {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      tags: ["StopPoints"],
      summary: "List all stop points",
      description: "List all stop points for a given trip",
      params: {
        type: "object",
        required: ["trip_id"],
        properties: { trip_id: { type: "number" } },
      },
      response: {
        200: {
          description: "Stop points retrieved successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  sequence_order: { type: "number", nullable: true },
                  latitude: { type: "number" },
                  longitude: { type: "number" },
                  description: { type: "string", nullable: true },
                  trip_id: { type: "number" },
                  booking_id: { type: "number" },
                },
              },
            },
          },
        },
        500: {
          description: "Internal server error",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Internal server error" },
          },
        },
      },
    },
    handler: stopPointsController.getAll,
  });

  app.get("/stoppoints/:id/by-id", {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      tags: ["StopPoints"],
      summary: "Get a stop point by ID",
      description: "Retrieve a single stop point by its ID",
      params: {
        type: "object",
        required: ["id"],
        properties: { id: { type: "number" } },
      },
      response: {
        200: {
          description: "Stop point retrieved successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                id: { type: "number" },
                sequence_order: { type: "number", nullable: true },
                latitude: { type: "number" },
                longitude: { type: "number" },
                description: { type: "string", nullable: true },
                trip_id: { type: "number" },
                booking_id: { type: "number" },
              },
            },
          },
        },
        404: {
          description: "Stop point not found",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "StopPoint not found" },
          },
        },
        400: {
          description: "Bad request",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Invalid parameters" },
          },
        },
      },
    },
    handler: stopPointsController.getById,
  });
}
