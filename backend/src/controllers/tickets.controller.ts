import { Request, Response, NextFunction } from 'express';
import { TicketService } from '../services/tickets.service';

export async function listTickets(req: Request, res: Response, next: NextFunction) {
  try {
    const tickets = await TicketService.list();
    res.json({ success: true, message: 'Tickets retrieved', data: tickets });
  } catch (error) {
    next(error);
  }
}

export async function getTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const ticket = await TicketService.get(req.params.id);
    res.json({ success: true, message: 'Ticket retrieved', data: ticket });
  } catch (error) {
    next(error);
  }
}

export async function createTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const ticket = await TicketService.create(req.body);
    res.status(201).json({ success: true, message: 'Ticket created', data: ticket });
  } catch (error) {
    next(error);
  }
}

export async function updateTicket(req: Request, res: Response, next: NextFunction) {
  try {
    const ticket = await TicketService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Ticket updated', data: ticket });
  } catch (error) {
    next(error);
  }
}

export async function deleteTicket(req: Request, res: Response, next: NextFunction) {
  try {
    await TicketService.remove(req.params.id);
    res.json({ success: true, message: 'Ticket deleted', data: null });
  } catch (error) {
    next(error);
  }
}
