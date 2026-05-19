import type { Request, Response } from 'express';
import { z } from 'zod';
import { LeadModel } from '../models/Lead.js';

const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(['new', 'contacted', 'qualified', 'lost']),
  source: z.enum(['website', 'instagram', 'referral']),
});

const querySchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'lost']).optional(),
  source: z.enum(['website', 'instagram', 'referral']).optional(),
  search: z.string().optional(),
  sort: z.enum(['latest', 'oldest']).default('latest'),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export async function getLeads(req: Request, res: Response): Promise<void> {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid query params' });
    return;
  }

  const { status, source, search, sort, page, limit } = parsed.data;
  const query: Record<string, unknown> = {};
  
  // Sales users only see their own leads; admins see all
  if (req.user?.role === 'sales') {
    query.createdBy = req.user._id;
  }
  
  if (status) query.status = status;
  if (source) query.source = source;
  if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }];

  const [items, total] = await Promise.all([
    LeadModel.find(query)
      .sort({ createdAt: sort === 'latest' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(limit),
    LeadModel.countDocuments(query),
  ]);

  res.json({
    data: items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      email: item.email,
      status: item.status,
      source: item.source,
      createdAt: item.createdAt.toISOString(),
      createdById: item.createdBy?.toString(),
    })),
    total,
    page,
    pages: Math.max(1, Math.ceil(total / limit)),
  });
}

export async function getLeadById(req: Request, res: Response): Promise<void> {
  const lead = await LeadModel.findById(req.params.id);
  if (!lead) {
    res.status(404).json({ message: 'Lead not found' });
    return;
  }
  
  // Sales users can only view their own leads
  if (req.user?.role === 'sales' && lead.createdBy?.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  
  res.json({
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    createdAt: lead.createdAt.toISOString(),
    createdById: lead.createdBy?.toString(),
  });
}

export async function createLead(req: Request, res: Response): Promise<void> {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }
  const lead = await LeadModel.create({ ...parsed.data, createdBy: req.user?._id });
  res.status(201).json({
    id: lead._id.toString(),
    name: lead.name,
    email: lead.email,
    status: lead.status,
    source: lead.source,
    createdAt: lead.createdAt.toISOString(),
    createdById: lead.createdBy?.toString(),
  });
}

export async function updateLead(req: Request, res: Response): Promise<void> {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: 'Invalid input' });
    return;
  }
  
  const lead = await LeadModel.findById(req.params.id);
  if (!lead) {
    res.status(404).json({ message: 'Lead not found' });
    return;
  }
  
  // Sales users can only edit their own leads
  if (req.user?.role === 'sales' && lead.createdBy?.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  
  const updated = await LeadModel.findByIdAndUpdate(req.params.id, parsed.data, { new: true });
  if (!updated) {
    res.status(404).json({ message: 'Lead not found' });
    return;
  }
  res.json({
    id: updated._id.toString(),
    name: updated.name,
    email: updated.email,
    status: updated.status,
    source: updated.source,
    createdAt: updated.createdAt.toISOString(),
    createdById: updated.createdBy?.toString(),
  });
}

export async function deleteLead(req: Request, res: Response): Promise<void> {
  const lead = await LeadModel.findById(req.params.id);
  if (!lead) {
    res.status(404).json({ message: 'Lead not found' });
    return;
  }
  
  // Sales users can only delete their own leads
  if (req.user?.role === 'sales' && lead.createdBy?.toString() !== req.user._id.toString()) {
    res.status(403).json({ message: 'Forbidden' });
    return;
  }
  
  await LeadModel.findByIdAndDelete(req.params.id);
  res.status(204).send();
}
