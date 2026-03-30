import { Request, Response } from 'express';
import { serviceModel } from '../models/serviceModel';

export const serviceController = {
  getServices: async (req: Request, res: Response) => {
    const { category } = req.query;
    try {
      const services = serviceModel.list(category as string);
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching services' });
    }
  },

  getServiceById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const service = serviceModel.findById(Number(id));
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching service' });
    }
  }
};
