import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ProductSchema = new Schema({
  sale: Boolean,
  price: Number,
  society: String,
  qty: Number,
  size: { h: Number, w: Number, uom: String },
  year: Date,
});

export const ProductModel = model("products", ProductSchema);
