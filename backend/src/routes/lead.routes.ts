import { Router } from 'express';
import { createLead, deleteLead, getLeadById, getLeads, updateLead } from '../controllers/lead.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

export const leadRouter = Router();

leadRouter.use(requireAuth);
leadRouter.get('/', getLeads);
leadRouter.get('/:id', getLeadById);
leadRouter.post('/', requireRole('admin', 'sales'), createLead);
leadRouter.put('/:id', requireRole('admin', 'sales'), updateLead);
leadRouter.delete('/:id', requireRole('admin'), deleteLead);
