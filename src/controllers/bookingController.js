import { bookingService } from '../services/bookingService.js';

function sendSuccess(reply, data, message = null, status = 200) {
  if (typeof reply.sendSuccess === 'function') return reply.sendSuccess(data, message);
  return reply.status(status).send({ success: true, message, data });
}

function sendError(reply, message = 'Erro interno', status = 500) {
  if (typeof reply.sendError === 'function') return reply.sendError(message, status);
  return reply.status(status).send({ success: false, message });
}

export const bookingController = {
  async create(request, reply) {
    try {
      const data = request.body;
      const result = await bookingService.create(data);
      return sendSuccess(reply, result, 'Booking criado', 201);
    } catch (err) {
      if (err.name === 'ValidationError') {
        const errors = (err.inner || []).map(e => ({ path: e.path, message: e.message }));
        return reply.status(422).send({ success: false, errors });
      }
      return sendError(reply, err.message, 500);
    }
  },

  async getAll(request, reply) {
    try {
      const result = await bookingService.getAll();
      return sendSuccess(reply, result, null, 200);
    } catch (err) {
      return sendError(reply, err.message, 500);
    }
  },

  async getById(request, reply) {
    try {
      const { id } = request.params;
      const result = await bookingService.getById(Number(id));
      return sendSuccess(reply, result, null, 200);
    } catch (err) {
      return sendError(reply, err.message, 404);
    }
  },

  async update(request, reply) {
    try {
      const { id } = request.params;
      const data = request.body;
      const result = await bookingService.update(Number(id), data);
      return sendSuccess(reply, result, 'Booking atualizado', 200);
    } catch (err) {
      return sendError(reply, err.message, 400);
    }
  },

  async remove(request, reply) {
    try {
      const { id } = request.params;
      await bookingService.remove(Number(id));
      return sendSuccess(reply, null, 'Booking removido', 200);
    } catch (err) {
      return sendError(reply, err.message, 400);
    }
  }
};
