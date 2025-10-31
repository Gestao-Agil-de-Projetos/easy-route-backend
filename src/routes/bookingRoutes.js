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
                  trip: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      start_time: { type: "string", format: "date-time" },
                      estimated_end_time: {
                        type: "string",
                        format: "date-time",
                      },
                      total_seats: { type: "number" },
                      available_seats: { type: "number" },
                      price: { type: "number" },
                      status: { type: "string", example: "SCHEDULED" },
                      route: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          name: { type: "string" },
                          description: { type: "string", nullable: true },
                          pickup_type: { type: "string", example: "FIXED" },
                          start_name: { type: "string" },
                          start_latitude: { type: "number" },
                          start_longitude: { type: "number" },
                          end_name: { type: "string" },
                          end_latitude: { type: "number" },
                          end_longitude: { type: "number" },
                          base_price: { type: "number" },
                          is_active: { type: "boolean" },
                          van: {
                            type: "object",
                            nullable: true,
                            properties: {
                              id: { type: "number" },
                              plate: { type: "string" },
                              model: { type: "string" },
                              capacity: { type: "number" },
                              is_active: { type: "boolean" },
                              created_at: {
                                type: "string",
                                format: "date-time",
                              },
                              owner_id: { type: "number" },
                            },
                          },
                        },
                      },
                    },
                  },
                  stopPoints: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        latitude: { type: "number" },
                        longitude: { type: "number" },
                        description: { type: "string", nullable: true },
                        sequence_order: { type: "number", nullable: true },
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
            message: {
              type: "string",
              example: "You are not allowed to view these bookings.",
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

  app.get("/bookings/without-assessment", {
    preHandler: [app.authenticate],
    schema: {
      tags: ["Booking"],
      summary: "Get most recent booking without assessment",
      description:
        "Returns the most recent booking (and its related trip) of the logged-in user that does not yet have an assessment.",
      response: {
        200: {
          description: "Booking without assessment retrieved successfully",
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "object",
              properties: {
                booking_id: { type: "number" },
                created_at: { type: "string", format: "date-time" },
                status: { type: "string", example: "FINISHED" },
                trip: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    start_time: { type: "string", format: "date-time" },
                    estimated_end_time: { type: "string", format: "date-time" },
                    price: { type: "number" },
                    route: {
                      type: "object",
                      properties: {
                        start_name: { type: "string" },
                        end_name: { type: "string" },
                        base_price: { type: "number" },
                        start_latitude: { type: "string" },
                        start_longitude: { type: "string" },
                        end_latitude: { type: "string" },
                        end_longitude: { type: "string" },
                        van: {
                          owner: {
                            name: { type: "string" },
                          },
                        },
                      },
                    },
                  },
                },
                relatedBookings: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      booking_id: { type: "number" },
                      user_id: { type: "number" },
                      created_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
        404: {
          description: "No bookings without assessment found",
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: {
              type: "string",
              example: "No bookings without assessment found",
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
    handler: bookingController.getLatestWithoutAssessment,
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
            message: {
              type: "string",
              example: "Booking and StopPoint successfully created",
            },
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
            message: {
              type: "string",
              example: "Booking successfully updated",
            },
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
            message: {
              type: "string",
              example: "Unauthorized access to booking.",
            },
          },
        },
      },
    },
    handler: bookingController.update,
  });
}
