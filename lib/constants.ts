import {
  Archive,
  Blocks,
  CircleDollarSign,
  Clipboard,
  Home,
  SlidersHorizontal,
  User,
} from 'lucide-react';

export const sidebarData = [
  { url: '/dashboard', icon: Home, title: 'Dashboard' },
  { url: '/inventory', icon: Archive, title: 'Inventory' },
  { url: '/products', icon: Clipboard, title: 'Products' },
  { url: '/categories', icon: Blocks, title: 'Categories' },
  { url: '/users', icon: User, title: 'Users' },
  { url: '/settings', icon: SlidersHorizontal, title: 'Settings' },
  { url: '/expenses', icon: CircleDollarSign, title: 'Expenses' },
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
    message: 'An error occurred while processing your request. Please try again later.',
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

export const PAGE_ROUTE = {
  DASHBOARD: '/dashboard',
  INVENTORY: '/dashboard/inventory',
  PRODUCTS: '/dashboard/products',
  CATEGORIES: '/dashboard/categories',
  USERS: '/users',
  SETTINGS: '/settings',
  EXPENSES: '/expenses',

  ADD_NEW_PRODUCT: '/dashboard/products/add',
  EDIT_PRODUCT: '/dashboard/products/edit',
};
