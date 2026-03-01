// models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IProductDocument extends Document {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  rating: { average: number; count: number };
  isFlashSale: boolean;
  flashSaleEndsAt?: Date;
  createdAt: Date;
}

const ProductSchema = new Schema<IProductDocument>(
  {
    name:           { type: String, required: true, trim: true },
    slug:           { type: String, required: true, unique: true, lowercase: true },
    description:    { type: String, required: true },
    price:          { type: Number, required: true, min: 0 },
    compareAtPrice: { type: Number },
    images:         [{ type: String }],
    category:       { type: String, required: true, index: true },
    tags:           [{ type: String }],
    stock:          { type: Number, required: true, default: 0 },
    rating: {
      average: { type: Number, default: 0 },
      count:   { type: Number, default: 0 },
    },
    isFlashSale:     { type: Boolean, default: false },
    flashSaleEndsAt: { type: Date },
  },
  { timestamps: true }
);

// Full text search index
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product ||
  mongoose.model<IProductDocument>('Product', ProductSchema);