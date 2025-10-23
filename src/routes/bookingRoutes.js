import { bookingController } from "../controllers/bookingController.js";
import {
  createBookingSchema,
  updateBookingSchema,
} from "../validation/booking-validation.js";
import { checkOwner } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";

export async function bookingRoutes(app) {
  app.get(
    "/bookings",
    {
      preHandler: [app.authenticate, checkOwner],
      schema: {
        tags: ["Booking"],
        summary: "Lista todos os bookings",
        description: "Lista todos os bookings",
      },
    },
    bookingController.getAll
  );

  app.get(
    "/bookings/:id",
    {
      preHandler: [app.authenticate, checkOwner],
      schema: {
        tags: ["Booking"],
        summary: "Busca booking pelo ID",
        description: "Busca booking pelo ID",
        params: { type: "object", properties: { id: { type: "integer" } } },
      },
    },
    bookingController.getById
  );

  app.post(
    "/bookings",
    {
      preHandler: [app.authenticate, checkOwner, validate(createBookingSchema)],
      schema: {
        tags: ["Booking"],
        summary: "Cria um novo booking",
        description: "Cria um novo booking",
        body: {
          type: "object",
          required: ["userId", "routeId", "date"],
          properties: {
            userId: { type: "integer" },
            routeId: { type: "integer" },
            stopPointId: { type: "integer" },
            date: { type: "string", format: "date-time" },
            status: { type: "string" },
          },
        },
      },
    },
    bookingController.create
  );

  app.patch(
    "/bookings/:id",
    {
      preHandler: [app.authenticate, checkOwner, validate(updateBookingSchema)],
      schema: {
        tags: ["Booking"],
        summary: "Atualiza um booking existente",
        description: "Atualiza um booking existente",
        params: { type: "object", properties: { id: { type: "integer" } } },
        body: {
          type: "object",
          properties: {
            pickup_latitude: { type: "number" },
            pickup_longitude: { type: "number" },
            status: { type: "string" },
          },
        },
      },
    },
    bookingController.update
  );

  app.delete(
    "/bookings/:id",
    {
      preHandler: [app.authenticate, checkOwner],
      schema: {
        tags: ["Booking"],
        summary: "Deleta booking pelo ID",
        description: "Deleta booking pelo ID",
        params: { type: "object", properties: { id: { type: "integer" } } },
      },
    },
    bookingController.remove
  );
}
