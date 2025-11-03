import { assessmentController } from "../controllers/assessmentController.js";
import { checkOwner } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import { assessmentSchema } from "../validation/assessment-validation.js";

export async function assessmentRoutes(app) {
  app.post("/assessment", {
    preHandler: [app.authenticate, validate(assessmentSchema)],
    schema: {
      tags: ["Assessments"],
      summary: "Create a new assessment for a trip",
      description:
        "Registers a new assessment (rating and feedback) for a completed trip.",
      body: {
        type: "object",
        required: ["trip_id", "booking_id", "rating", "feedback"],
        properties: {
          trip_id: { type: "number", description: "Trip identifier" },
          booking_id: { type: "number", description: "Booking identifier" },
          rating: {
            type: "number",
            minimum: 1,
            maximum: 5,
            description: "Rating from 1 to 5",
          },
          feedback: { type: "string", description: "Optional text feedback" },
        },
      },
      response: {
        200: {
          description: "Assessment created successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                id: { type: "number", example: 12 },
                rating: { type: "number", example: 5 },
                feedback: { type: "string", example: "Excelent trip!" },
                created_at: {
                  type: "string",
                  format: "date-time",
                  example: "2025-10-31T17:00:00Z",
                },
                trip_id: { type: "number", example: 42 },
                booking_id: { type: "number", example: 101 },
              },
            },
          },
        },
        400: {
          description: "Bad request",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: {
              type: "string",
              example: "Missing or invalid parameters",
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
    handler: assessmentController.create,
  });
}
