import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'admin' | 'manager' | 'officer' | 'viewer';

export interface IUser extends Document {
  email: string;
  name: string;
  password?: string; // Optional if using external auth
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    password: {
      type: String,
      // Don't require password if using external auth
    },
    role: {
      type: String,
      enum: ['admin', 'manager', 'officer', 'viewer'],
      default: 'viewer',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes
UserSchema.index({ email: 1 });

// Export the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;

