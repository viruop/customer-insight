import mongoose, { Schema, Document } from "mongoose";

interface ITransaction extends Document {
  accountId: string;
  amount: number;
  date: Date;
  transactionType: "Deposit" | "Withdrawal" | "Interest";
}

const TransactionSchema: Schema = new Schema({
  accountId: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionType: {
    type: String,
    enum: ["Deposit", "Withdrawal", "Interest"],
    required: true,
  },
  date: { type: Date, required: true },
});

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
