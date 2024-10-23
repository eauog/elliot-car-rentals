import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'manager' | 'employee';
  isEmailConfirmed: boolean;
  emailConfirmationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: number;
}

const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'admin', 'manager', 'employee'], default: 'customer' },
  isEmailConfirmed: { type: Boolean, default: false },
  emailConfirmationToken: { type: String },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
