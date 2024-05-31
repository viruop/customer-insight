import mongoose, { Schema, Document } from "mongoose";

interface ICustomer extends Document {
  name: string;
  address: string;
  accounts: Array<{ id: string }>;
  isActive: boolean;
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  accounts: [{ id: { type: String, required: true } }],
  isActive: { type: Boolean, default: true },
});

export default mongoose.model<ICustomer>("Customer", CustomerSchema);
