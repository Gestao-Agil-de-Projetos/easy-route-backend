import { bookingController } from "../controllers/bookingController.js";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../validation/booking-validation.js";
import { checkOwner } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";

export async function bookingRoutes(app) {
  app.get("/bookings/", {
    preHandler: [app.authenticate],
    schema: {
      tags: ["Booking"],
      summary: "List bookings of the logged-in user",
      description:
        "Returns all bookings of the authenticated user, with optional filtering by one or more statuses.",
      querystring: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description:
              "Filter bookings by status (e.g., PENDING, CONFIRMED, FINISHED)",
          },
        },
      },
      response: {
        200: {
          description: "Bookings retrieved successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  booking_id: { type: "number" },
                  status: { type: "string", example: "CONFIRMED" },
                  trip_id: { type: "number" },
                  user_id: { type: "number" },
                  created_at: { type: "string", format: "date-time" },
                  stopPoints: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        latitude: { type: "number" },
                        longitude: { type: "number" },
                        description: { type: "string", nullable: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "No bookings found",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "No bookings found" },
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
    handler: bookingController.getByUserId,
  });

  app.get("/bookings/:trip_id", {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      tags: ["Booking"],
      summary: "List all bookings for a trip",
      description: "Returns all bookings for a specific trip",
      params: { type: "object", properties: { trip_id: { type: "number" } } },
      response: {
        200: {
          description: "Bookings retrieved successfully",
          type: "array",
          items: {
            type: "object",
            properties: {
              booking_id: { type: "number" },
              status: { type: "string", example: "CONFIRMED" },
              trip_id: { type: "number" },
              user_id: { type: "number" },
              created_at: { type: "string", format: "date-time" },
            },
          },
        },
        403: {
          description: "Unauthorized access to bookings",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "You are not allowed to view these bookings." },
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
    handler: bookingController.getAll,
  });

  app.get("/bookings/:id/by-id", {
    preHandler: [app.authenticate],
    schema: {
      tags: ["Booking"],
      summary: "Get booking by ID",
      description: "Retrieves a booking by its ID",
      params: { type: "object", properties: { id: { type: "number" } } },
      response: {
        200: {
          description: "Booking retrieved successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                booking_id: { type: "number" },
                status: { type: "string", example: "CONFIRMED" },
                trip_id: { type: "number" },
                user_id: { type: "number" },
                created_at: { type: "string", format: "date-time" },
                stopPoints: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      latitude: { type: "number" },
                      longitude: { type: "number" },
                      description: { type: "string", nullable: true },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "Booking not found",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Booking not found" },
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
    handler: bookingController.getById,
  });

  app.post("/bookings", {
    preHandler: [app.authenticate, validate(createBookingSchema)],
    schema: {
      tags: ["Booking"],
      summary: "Create a new booking with a stop point",
      description:
        "Creates a new booking and associates a stop point with the corresponding trip",
      body: {
        type: "object",
        properties: {
          userId: { type: "number" },
          tripId: { type: "number" },
          stopPoint: {
            type: "object",
            properties: {
              latitude: { type: "number" },
              longitude: { type: "number" },
              description: { type: "string" },
            },
          },
        },
      },
      response: {
        201: {
          description: "Booking created successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Booking and StopPoint successfully created" },
            data: {
              type: "object",
              properties: {
                booking_id: { type: "number" },
                trip_id: { type: "number" },
                user_id: { type: "number" },
                status: { type: "string", example: "CONFIRMED" },
                created_at: { type: "string", format: "date-time" },
                stopPoint: {
                  type: "object",
                  properties: {
                    latitude: { type: "number" },
                    longitude: { type: "number" },
                    description: { type: "string", nullable: true },
                  },
                },
              },
            },
          },
        },
        422: {
          description: "Validation errors",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  path: { type: "string", example: "tripId" },
                  message: { type: "string", example: "Trip ID is required" },
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
    handler: bookingController.create,
  });

  app.patch("/bookings/:id", {
    preHandler: [app.authenticate, validate(updateBookingSchema)],
    schema: {
      tags: ["Booking"],
      summary: "Update an existing booking",
      description: "Updates an existing booking",
      params: { type: "object", properties: { id: { type: "number" } } },
      body: {
        type: "object",
        properties: {
          userId: { type: "number" },
          tripId: { type: "number" },
          stopPoint: {
            type: "object",
            properties: {
              latitude: { type: "number" },
              longitude: { type: "number" },
              description: { type: "string" },
            },
          },
        },
      },
      response: {
        200: {
          description: "Booking updated successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string", example: "Booking successfully updated" },
            data: {
              type: "object",
              properties: {
                booking_id: { type: "number" },
                trip_id: { type: "number" },
                user_id: { type: "number" },
                status: { type: "string", example: "CONFIRMED" },
                stopPoint: {
                  type: "object",
                  properties: {
                    latitude: { type: "number" },
                    longitude: { type: "number" },
                    description: { type: "string", nullable: true },
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Bad request or unauthorized update",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Unauthorized access to booking." },
          },
        },
      },
    },
    handler: bookingController.update,
  });
};
