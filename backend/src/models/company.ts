import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  sector: string;
  openings: number;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  sector: { type: String, required: true },
  openings: { type: Number, required: true }
});

export default mongoose.model<ICompany>('Company', CompanySchema);
