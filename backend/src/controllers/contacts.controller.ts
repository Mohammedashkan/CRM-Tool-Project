import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contacts.service';

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const contacts = await ContactService.list(req.query);
    res.json({ success: true, message: 'Contacts retrieved', data: contacts });
  } catch (error) {
    next(error);
  }
}

export async function getContact(req: Request, res: Response, next: NextFunction) {
  try {
    const contact = await ContactService.get(req.params.id);
    res.json({ success: true, message: 'Contact retrieved', data: contact });
  } catch (error) {
    next(error);
  }
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const contact = await ContactService.create(req.body);
    res.status(201).json({ success: true, message: 'Contact created', data: contact });
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req: Request, res: Response, next: NextFunction) {
  try {
    const contact = await ContactService.update(req.params.id, req.body);
    res.json({ success: true, message: 'Contact updated', data: contact });
  } catch (error) {
    next(error);
  }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    await ContactService.remove(req.params.id);
    res.json({ success: true, message: 'Contact deleted', data: null });
  } catch (error) {
    next(error);
  }
}
