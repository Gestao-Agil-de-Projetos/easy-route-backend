import { tripController } from "../controllers/tripController.js";
import { checkOwner } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";
import {
  createTripSchema,
  updateTripSchema,
} from "../validation/trip-validation.js";

export async function tripRoutes(app) {
  app.get("/trips/:route_id", {
    preHandler: [app.authenticate],
    schema: {
      summary: "List all trips by route",
      description: "List all trips for a specific route",
      tags: ["Trip"],
      params: {
        type: "object",
        properties: {
          route_id: { type: "number" },
        },
      },
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
                  start_time: { type: "string", format: "date-time" },
                  estimated_end_time: { type: "string", format: "date-time" },
                  total_seats: { type: "number" },
                  available_seats: { type: "number" },
                  price: { type: "number" },
                  status: { type: "string" },
                  route_id: { type: "number" },
                },
              },
            },
            message: { type: "string" },
          },
        },
        404: {
          description: "Route not found",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.getAllByRoute.bind(tripController),
  });

  app.get("/trips/:id/by-id", {
    preHandler: [app.authenticate],
    schema: {
      summary: "Get trip by ID",
      description: "Get trip by ID",
      tags: ["Trip"],
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
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
                start_time: { type: "string", format: "date-time" },
                estimated_end_time: { type: "string", format: "date-time" },
                total_seats: { type: "number" },
                available_seats: { type: "number" },
                price: { type: "number" },
                status: { type: "string" },
                route_id: { type: "number" },
                route: {
                  type: "object",
                  properties: {
                    id: { type: "number" },
                    name: { type: "string" },
                    van: {
                      type: "object",
                      properties: {
                        id: { type: "number" },
                        plate: { type: "string" },
                        owner_id: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
            message: { type: "string" },
          },
        },
        404: {
          description: "Trip not found",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.getById,
  });

  app.get("/trips/:user_id/by-user", {
    preHandler: [app.authenticate],
    schema: {
      summary: "Get trips by user",
      description: "Get trips by user ID",
      tags: ["Trip"],
      params: {
        type: "object",
        properties: {
          user_id: { type: "number" },
        },
      },
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
                  start_time: { type: "string", format: "date-time" },
                  estimated_end_time: { type: "string", format: "date-time" },
                  total_seats: { type: "number" },
                  available_seats: { type: "number" },
                  price: { type: "number" },
                  status: { type: "string" },
                  route_id: { type: "number" },
                },
              },
            },
            message: { type: "string" },
          },
        },
        404: {
          description: "Trip not found",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.getByUserId.bind(tripController),
  });

  app.get("/trips/nearby-by-coordinates", {
    preHandler: [app.authenticate],
    schema: {
      summary: "List trips near city coordinates",
      description:
        "Returns all trips whose associated route has start coordinates close to the given ones (city-level proximity).",
      tags: ["Trip"],
      querystring: {
        type: "object",
        required: ["latitude", "longitude"],
        properties: {
          latitude: { type: "number" },
          longitude: { type: "number" },
          radius: {
            type: "number",
            description: "Search radius in degrees (default: 0.25 ≈ 25 km)",
          },
        },
      },
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
                  start_time: { type: "string", format: "date-time" },
                  estimated_end_time: { type: "string", format: "date-time" },
                  total_seats: { type: "number" },
                  available_seats: { type: "number" },
                  price: { type: "number" },
                  status: { type: "string" },
                  route_id: { type: "number" },
                  route: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      name: { type: "string" },
                      start_latitude: { type: "number" },
                      start_longitude: { type: "number" },
                      end_latitude: { type: "number" },
                      end_longitude: { type: "number" },
                    },
                  },
                },
              },
            },
            message: { type: "string" },
          },
        },
        400: {
          description: "Validation error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.getByRouteCoordinatesNearby.bind(tripController),
  });

  app.get("/trips/by-coordinates", {
    preHandler: [app.authenticate],
    schema: {
      summary: "List trips by exact start and end coordinates",
      description:
        "Returns all trips whose associated route has start and end coordinates exactly matching the given ones.",
      tags: ["Trip"],
      querystring: {
        type: "object",
        required: [
          "start_latitude",
          "start_longitude",
          "end_latitude",
          "end_longitude",
        ],
        properties: {
          start_latitude: { type: "number" },
          start_longitude: { type: "number" },
          end_latitude: { type: "number" },
          end_longitude: { type: "number" },
          date: {
            type: "string",
            format: "date",
          },
        },
      },
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
                  start_time: { type: "string", format: "date-time" },
                  estimated_end_time: { type: "string", format: "date-time" },
                  total_seats: { type: "number" },
                  available_seats: { type: "number" },
                  price: { type: "number" },
                  status: { type: "string" },
                  route_id: { type: "number" },
                  route: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      name: { type: "string" },
                      start_latitude: { type: "number" },
                      start_longitude: { type: "number" },
                      end_latitude: { type: "number" },
                      end_longitude: { type: "number" },
                    },
                  },
                },
              },
            },
            message: { type: "string" },
          },
        },
        400: {
          description: "Validation error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.getByRouteCoordinates.bind(tripController),
  });

  app.get("/trips/by-owner", {
    preHandler: [app.authenticate, checkOwner],
    schema: {
      summary: "List trips by owner and status",
      description:
        "Returns all trips whose van owner associated with the route is the authenticated user. Can filter by one or more statuses.",
      tags: ["Trip"],
      querystring: {
        type: "object",
        properties: {
          status: {
            type: "string",
            description:
              "Filter trips by multiple statuses separated by comma (e.g., SCHEDULED,ONGOING).",
          },
        },
      },
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
                  start_time: { type: "string", format: "date-time" },
                  estimated_end_time: { type: "string", format: "date-time" },
                  total_seats: { type: "number" },
                  available_seats: { type: "number" },
                  price: { type: "number" },
                  status: { type: "string" },
                  route_id: { type: "number" },
                  route: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      name: { type: "string" },
                      van: {
                        type: "object",
                        properties: {
                          id: { type: "number" },
                          plate: { type: "string" },
                          owner_id: { type: "number" },
                        },
                      },
                    },
                  },
                },
              },
            },
            message: { type: "string" },
          },
        },
        400: {
          description: "Validation error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.getByOwnerAndStatus.bind(tripController),
  });

  app.post("/trips", {
    preHandler: [app.authenticate, checkOwner, validate(createTripSchema)],
    schema: {
      summary: "Create a new trip",
      description: "Create a new trip",
      tags: ["Trip"],
      body: {
        type: "object",
        required: ["start_time", "estimated_end_time", "route_id"],
        properties: {
          start_time: { type: "string", format: "date-time" },
          estimated_end_time: { type: "string", format: "date-time" },
          total_seats: { type: "integer" },
          available_seats: { type: "integer" },
          price: { type: "number" },
          route_id: { type: "number" },
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
                start_time: { type: "string", format: "date-time" },
                estimated_end_time: { type: "string", format: "date-time" },
                total_seats: { type: "number" },
                available_seats: { type: "number" },
                price: { type: "number" },
                status: { type: "string" },
                route_id: { type: "number" },
              },
            },
            message: { type: "string" },
          },
        },
        400: {
          description: "Validation error",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        403: {
          description: "Permission denied",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.create,
  });

  app.patch("/trips/:id", {
    preHandler: [app.authenticate, checkOwner, validate(updateTripSchema)],
    schema: {
      summary: "Update a trip",
      description: "Update a trip",
      tags: ["Trip"],
      params: {
        type: "object",
        properties: {
          id: { type: "number" },
        },
      },
      body: {
        type: "object",
        properties: {
          start_time: { type: "string", format: "date-time" },
          estimated_end_time: { type: "string", format: "date-time" },
          total_seats: { type: "integer" },
          available_seats: { type: "integer" },
          price: { type: "number" },
          status: {
            type: "string",
            enum: ["SCHEDULED", "ONGOING", "FINISHED", "CANCELLED"],
          },
          route_id: { type: "number" },
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
                start_time: { type: "string", format: "date-time" },
                estimated_end_time: { type: "string", format: "date-time" },
                total_seats: { type: "number" },
                available_seats: { type: "number" },
                price: { type: "number" },
                status: { type: "string" },
                route_id: { type: "number" },
              },
            },
            message: { type: "string" },
          },
        },
        404: {
          description: "Trip not found",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
        403: {
          description: "Permission denied",
          type: "object",
          properties: {
            success: { type: "boolean" },
            message: { type: "string" },
          },
        },
      },
    },
    handler: tripController.update,
  });
}
