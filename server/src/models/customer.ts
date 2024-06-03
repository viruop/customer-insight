import mongoose, { Schema, Document } from "mongoose";

interface ICustomer extends Document {
  name: string;
  address: string;
  accounts: Array<{ id: string }>;
  isActive: boolean;
}

const tierDetailsSchema = new Schema(
  {
    tier: { type: String, required: true },
    id: { type: String, required: true },
    active: { type: Boolean, required: true },
    benefits: { type: [String], required: true },
  },
  { _id: false }
);

// Define the main customers schema
const customerSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  birthdate: { type: Date, required: true },
  email: { type: String, required: true },
  active: { type: Boolean, required: true },
  accounts: { type: [Number], required: true },
  tier_and_details: {
    type: Map,
    of: tierDetailsSchema,
    required: true,
  },
});

export default mongoose.model<ICustomer>("Customer", customerSchema);
