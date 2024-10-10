import mongoose, { Schema, Document, Model } from 'mongoose';

interface IVehicle extends Document {
  make: string;
  model: string;
  year: number;
  availability: boolean;
  pricePerDay: number;
  maintenanceSchedule: Date[];
  imageUrl: string; 
}

const VehicleSchema: Schema<IVehicle> = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  availability: { type: Boolean, default: true },
  pricePerDay: { type: Number, required: true },
  maintenanceSchedule: [{ type: Date }],
  imageUrl: { type: String, required: true },  
}, { timestamps: true });

const Vehicle: Model<IVehicle> = mongoose.models.Vehicle || mongoose.model('Vehicle', VehicleSchema);
export default Vehicle;
