import {
  Layout,
  Archive,
  Clipboard,
  User,
  SlidersHorizontal,
  CircleDollarSign,
} from 'lucide-react';

export const sidebarLinks = [
  { href: '/dashboard', icon: Layout, label: 'Dashboard' },
  { href: '/inventory', icon: Archive, label: 'Inventory' },
  { href: '/products', icon: Clipboard, label: 'Products' },
  { href: '/users', icon: User, label: 'Users' },
  { href: '/settings', icon: SlidersHorizontal, label: 'Settings' },
  { href: '/expenses', icon: CircleDollarSign, label: 'Expenses' },
];

export const measurement_units = [
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'g', label: 'Gram (g)' },
  { value: 'lb', label: 'Pound (lb)' },
  { value: 'oz', label: 'Ounce (oz)' },
  { value: 'l', label: 'Liter (L)' },
  { value: 'ml', label: 'Milliliter (ml)' },
  { value: 'packet', label: 'Packet' },
  { value: 'piece', label: 'Piece' },
  { value: 'dozen', label: 'Dozen' },
];

export const API_ERROR = {
  DATABASE_ERROR: {
    error: 'DATABASE_ERROR',
    message:
      'An error occurred while processing your request. Please try again later.',
  },
  VALIDATION_ERROR: {
    error: 'VALIDATION_ERROR',
    message: 'Invalid input data. Please check the form.',
  },
  SERVER_ERROR: {
    error: 'SERVER_ERROR',
    message: 'An unexpected error occurred. Please try again later.',
  },
};
