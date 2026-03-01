// types/index.ts

export interface IProduct {
  _id: string;
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
  flashSaleEndsAt?: string;
  createdAt: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
  wishlist: string[];
}

export interface IOrder {
  _id: string;
  user: string;
  items: IOrderItem[];
  shippingAddress: IAddress;
  paymentIntentId: string;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discountAmount: number;
  total: number;
  trackingNumber?: string;
  createdAt: string;
}

export interface IOrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IAddress {
  line1: string;
  city: string;
  state: string;
  zip: string;
}

export interface ICartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}