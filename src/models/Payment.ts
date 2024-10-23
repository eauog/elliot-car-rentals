import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPayment extends Document {
  booking: mongoose.Schema.Types.ObjectId;
  customer: mongoose.Schema.Types.ObjectId;
  amount: number;
  reference: string;  
}

const PaymentSchema: Schema<IPayment> = new Schema({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  reference: { type: String, required: true },  
}, { timestamps: true });

const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);
export default Payment;
