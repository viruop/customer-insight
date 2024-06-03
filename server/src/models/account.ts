import mongoose, { Schema, Document } from "mongoose";

// Define the account schema
const accountSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  account_id: { type: Number, required: true },
  limit: { type: Number, required: true },
  products: { type: [String], required: true },
});

export default mongoose.model("Account", accountSchema);
