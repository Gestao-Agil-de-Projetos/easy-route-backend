import { vanController } from '../controllers/vanController.js';
import { checkOwner } from '../middlewares/checkOwner.js';
import { checkAuth } from '../middlewares/checkAuth.js';

export async function vanRoutes(app) {


  app.get(
    '/vans', 
    { 
      preHandler: [checkAuth] 
    }, 
    vanController.getAllByOwner
  );


  app.get(
    '/vans/:id', 
    { 
      preHandler: [checkAuth] 
    }, 
    vanController.getById
  );



  app.post(
    '/vans', 
    { 
      preHandler: [checkAuth, checkOwner] 
    }, 
    vanController.create
  );


  app.put(
    '/vans/:id', 
    { 
      preHandler: [checkAuth, checkOwner] 
    }, 
    vanController.update
  );

 
  app.delete(
    '/vans/:id', 
    { 
      preHandler: [checkAuth, checkOwner] 
    }, 
    vanController.delete
  );
}