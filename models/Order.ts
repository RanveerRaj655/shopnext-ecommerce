// models/Order.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderDocument extends Document {
  user: mongoose.Types.ObjectId;
  items: {
    product: mongoose.Types.ObjectId;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    fullName: string;
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentIntentId: string;
  stripeSessionId: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discountAmount: number;
  total: number;
  trackingNumber?: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrderDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product:  { type: Schema.Types.ObjectId, ref: 'Product' },
        name:     { type: String, required: true },
        image:    { type: String, required: true },
        price:    { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      fullName: String,
      line1:    String,
      city:     String,
      state:    String,
      zip:      String,
      country:  String,
    },
    paymentIntentId: { type: String },
    stripeSessionId: { type: String },
    status: {
      type: String,
      enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    subtotal:       { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    total:          { type: Number, required: true },
    trackingNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model<IOrderDocument>('Order', OrderSchema);