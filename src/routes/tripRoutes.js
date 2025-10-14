import { tripController } from '../controllers/tripController.js';
import { validate } from '../middlewares/validate.js';
import { createTripSchema, updateTripSchema } from '../validation/trip-validation.js';

export async function tripRoutes(app) {
  app.get('/trips', {
    preHandler: [app.authenticate],
    handler: tripController.getAllByRoute.bind(tripController),
  });

  app.get('/trips/:id', {
    preHandler: [app.authenticate],
    handler: tripController.getById,
  });

  app.post('/trips', {
    preHandler: [app.authenticate, validate(createTripSchema)],
    handler: tripController.create,
  });

  app.put('/trips/:id', {
    preHandler: [app.authenticate, validate(updateTripSchema)],
    handler: tripController.update,
  });

  app.delete('/trips/:id', {
    preHandler: [app.authenticate],
    handler: tripController.delete,
  });
}
