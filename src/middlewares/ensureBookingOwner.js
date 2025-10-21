import { bookingService } from '../services/bookingService.js';

export async function ensureBookingOwner(request, reply) {
  try {
    const { id } = request.params;
    const userId = request.user?.id;
    if (!userId) return reply.status(401).send({ message: 'Not authenticated' });

    const booking = await bookingService.getById(Number(id));
    if (!booking) return reply.status(404).send({ message: 'Booking not found' });

    if (booking.userId !== userId) {
      return reply.status(403).send({ message: 'Forbidden: not owner' });
    }

    return;
  } catch (err) {
    return reply.status(500).send({ message: 'Server error' });
  }
}
