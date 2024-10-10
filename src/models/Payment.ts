import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPayment extends Document {
  booking: mongoose.Schema.Types.ObjectId;
  customer: mongoose.Schema.Types.ObjectId;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  reference: string;  // Paystack reference ID
}

const PaymentSchema: Schema<IPayment> = new Schema({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  reference: { type: String, required: true },  // Paystack payment reference
}, { timestamps: true });

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
export default Payment;
