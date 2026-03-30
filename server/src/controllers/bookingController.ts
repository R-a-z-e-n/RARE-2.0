import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { bookingModel } from '../models/bookingModel';
import { z } from 'zod';

export const bookingSchema = z.object({
  body: z.object({
    serviceId: z.number(),
    date: z.string(),
  }),
});

export const bookingController = {
  createBooking: async (req: AuthRequest, res: Response) => {
    const { serviceId, date } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const booking = bookingModel.create({
        userId,
        serviceId,
        date,
      });
      res.status(201).json({
        message: 'Booking created successfully',
        booking,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating booking' });
    }
  },

  getBookings: async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const bookings = bookingModel.listByUserId(userId);
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching bookings' });
    }
  }
};
