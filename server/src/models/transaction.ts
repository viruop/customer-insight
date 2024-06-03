import mongoose, { Schema, Document } from "mongoose";

// Define the transaction sub-document schema
const transactionSchema = new Schema(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    transaction_code: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: String, required: true },
    total: { type: String, required: true },
  },
  { _id: false }
);

// Define the main transactions schema
const transactionsSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  account_id: { type: Number, required: true },
  transaction_count: { type: Number, required: true },
  bucket_start_date: { type: Date, required: true },
  bucket_end_date: { type: Date, required: true },
  transactions: { type: [transactionSchema], required: true },
});

export default mongoose.model("Transaction", transactionsSchema);
