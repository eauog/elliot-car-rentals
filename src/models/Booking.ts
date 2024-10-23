import mongoose, { Schema, Document, Model } from 'mongoose';

interface IBooking extends Document {
  customer: mongoose.Schema.Types.ObjectId;
  vehicle: mongoose.Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

const BookingSchema: Schema<IBooking> = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

const Booking: Model<IBooking> = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export default Booking;
