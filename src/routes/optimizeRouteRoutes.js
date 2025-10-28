import { optimizeRouteController } from "../controllers/optimizeRouteController.js";
import { checkOwner } from "../middlewares/auth.js";

export async function optimizeRouteRoutes(app) {
  app.post("/trips/:trip_id/optimize", {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      summary: "Optimize the route based on stops and distances",
      description: "Optimize the route based on stops and distances",
      tags: ["Optimize-Route"],
      params: {
        type: "object",
        properties: { trip_id: { type: "number" } },
        required: ["trip_id"],
      },
      response: {
        200: {
          description: "Optimized route returned successfully",
          type: "object",
          properties: {
            success: { type: "boolean" },
            data: {
              type: "object",
              properties: { job_id: { type: "string" } },
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
      },
    },
    handler: optimizeRouteController.optimize,
  });
}
