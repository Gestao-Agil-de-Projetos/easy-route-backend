import { tripController } from '../controllers/tripController.js';
import { validate } from '../middlewares/validate.js';
import { createTripSchema, updateTripSchema } from '../validation/trip-validation.js';

export async function tripRoutes(app) {
  app.get('/trips', {
    preHandler: [app.authenticate],
    schema: {
      description: 'List all trips',
      tags: ['Trip'],
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              start_time: { type: 'string', format: 'date-time' },
              estimated_end_time: { type: 'string', format: 'date-time' },
              total_seats: { type: 'number' },
              available_seats: { type: 'number' },
              price: { type: 'number' },
              status: { type: 'string' },
              route_id: { type: 'number' },
            },
          },
        },
      },
    },
    handler: tripController.getAllByRoute.bind(tripController),
  });

  app.get('/trips/:id', {
    preHandler: [app.authenticate],
    schema: {
      description: 'Get trip by ID',
      tags: ['Trip'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            start_time: { type: 'string', format: 'date-time' },
            estimated_end_time: { type: 'string', format: 'date-time' },
            total_seats: { type: 'number' },
            available_seats: { type: 'number' },
            price: { type: 'number' },
            status: { type: 'string' },
            route_id: { type: 'number' },
          },
        },
        404: {
          description: 'Trip not found',
          type: 'object',
          properties: { message: { type: 'string' } },
        },
      },
    },
    handler: tripController.getById,
  });

  app.post('/trips', {
    preHandler: [app.authenticate, validate(createTripSchema)],
    schema: {
      description: 'Create a new trip',
      tags: ['Trip'],
      body: {
        type: 'object',
        required: [
          'start_time',
          'estimated_end_time',
          'total_seats',
          'available_seats',
          'price',
          'route_id',
        ],
        properties: {
          start_time: { type: 'string', format: 'date-time' },
          estimated_end_time: { type: 'string', format: 'date-time' },
          total_seats: { type: 'integer' },
          available_seats: { type: 'integer' },
          price: { type: 'number' },
          route_id: { type: 'number' },
        },
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            start_time: { type: 'string', format: 'date-time' },
            estimated_end_time: { type: 'string', format: 'date-time' },
            total_seats: { type: 'number' },
            available_seats: { type: 'number' },
            price: { type: 'number' },
            status: { type: 'string' },
            route_id: { type: 'number' },
          },
        },
        400: {
          description: 'Validation error',
          type: 'object',
          properties: { message: { type: 'string' } },
        },
      },
    },
    handler: tripController.create,
  });

  app.put('/trips/:id', {
    preHandler: [app.authenticate, validate(updateTripSchema)],
    schema: {
      description: 'Update a trip',
      tags: ['Trip'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
      body: {
        type: 'object',
        properties: {
          start_time: { type: 'string', format: 'date-time' },
          estimated_end_time: { type: 'string', format: 'date-time' },
          total_seats: { type: 'integer' },
          available_seats: { type: 'integer' },
          price: { type: 'number' },
          status: { type: 'string', enum: ['SCHEDULED','ONGOING','FINISHED','CANCELLED'] },
          route_id: { type: 'number' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            start_time: { type: 'string', format: 'date-time' },
            estimated_end_time: { type: 'string', format: 'date-time' },
            total_seats: { type: 'number' },
            available_seats: { type: 'number' },
            price: { type: 'number' },
            status: { type: 'string' },
            route_id: { type: 'number' },
          },
        },
        404: {
          description: 'Trip not found',
          type: 'object',
          properties: { message: { type: 'string' } },
        },
      },
    },
    handler: tripController.update,
  });

  app.delete('/trips/:id', {
    preHandler: [app.authenticate],
    schema: {
      description: 'Delete a trip',
      tags: ['Trip'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
      response: {
        204: {
          description: 'Trip deleted successfully',
        },
        404: {
          description: 'Trip not found',
          type: 'object',
          properties: { message: { type: 'string' } },
        },
      },
    },
    handler: tripController.delete,
  });
}
