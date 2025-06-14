import type React from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string, hint: string }[];
  category: string;
  stock: number;
  specifications?: Record<string, string>;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: React.ElementType;
  image?: { url: string, hint: string };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string; // Assuming Firebase UID
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Picked Up' | 'Cancelled';
  deliveryMethod: 'Local Delivery' | 'In-Store Pickup';
  shippingAddress?: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber?: string;
  };
  pickupLocation?: string; // For in-store pickup
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  // ElectroLocal specific fields
  defaultShippingAddress?: Order['shippingAddress'];
  phoneNumber?: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ElementType;
  adminOnly?: boolean;
  authRequired?: boolean;
}
