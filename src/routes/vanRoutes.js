import { vanController } from '../controllers/vanController.js';
import { checkOwner } from '../middlewares/checkOwner.js';
import { validate } from '../middlewares/validate.js';
import { createVanSchema, updateVanSchema } from '../validation/vanValidation.js';

export async function vanRoutes(app) {
  app.get(
    '/vans',
    {
      preHandler: [app.authenticate],
    },
    vanController.getAllByOwner
  );

  app.get(
    '/vans/:id',
    {
      preHandler: [app.authenticate],
    },
    vanController.getById
  );

  app.post(
    '/vans',
    {
      preHandler: [app.authenticate, checkOwner, validate(createVanSchema)],
    },
    vanController.create
  );

  app.put(
    '/vans/:id',
    {
      preHandler: [app.authenticate, checkOwner, validate(updateVanSchema)],
    },
    vanController.update
  );

  app.delete(
    '/vans/:id',
    {
      preHandler: [app.authenticate, checkOwner],
    },
    vanController.delete
  );
}