import { routeController } from '../controllers/routeController.js';
import { checkOwner } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createRouteSchema, updateRouteSchema } from '../validation/route.js';

export async function routeRoutes(app) {
  app.get(
    '/vans/:van_id/routes',
    {
      preHandler: [app.authenticate],
    },
    routeController.getAllByVan
  );

  app.get(
    '/routes/:id',
    {
      preHandler: [app.authenticate],
    },
    routeController.getById
  );

  app.post(
    '/routes',
    {
      preHandler: [app.authenticate, checkOwner, validate(createRouteSchema)],
    },
    routeController.create
  );

  app.put(
    '/routes/:id',
    {
      preHandler: [app.authenticate, checkOwner, validate(updateRouteSchema)],
    },
    routeController.update
  );

  app.delete(
    '/routes/:id',
    {
      preHandler: [app.authenticate, checkOwner],
    },
    routeController.delete
  );
}
