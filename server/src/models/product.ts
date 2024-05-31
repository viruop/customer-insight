import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
  productName: string;
  price: number;
  category: string;
}

const ProductSchema: Schema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
