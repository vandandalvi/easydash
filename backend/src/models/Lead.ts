import mongoose, { Schema, type InferSchemaType } from 'mongoose';

const leadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'lost'], required: true },
    source: { type: String, enum: ['website', 'instagram', 'referral'], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export type LeadDocument = InferSchemaType<typeof leadSchema> & { _id: mongoose.Types.ObjectId };
export const LeadModel = mongoose.model('Lead', leadSchema);
