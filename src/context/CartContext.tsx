'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TShirtOption, TShirtSize, QualityTier } from '@/data/products';

export interface CartItem {
  id: string;
  product: TShirtOption;
  tier: QualityTier;
  size: TShirtSize;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: TShirtOption,
    tier: QualityTier,
    size: TShirtSize,
    color?: string,
    quantity?: number
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (
    product: TShirtOption,
    tier: QualityTier,
    size: TShirtSize,
    color?: string,
    qtyToAdd: number = 1
  ) => {
    const selectedColor = color || (product.colors.length > 0 ? product.colors[0].name : 'Standard');
    const itemId = `${product.id}-${tier.id}-${selectedColor}-${size}`;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing) {
        return prev.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity + qtyToAdd } : i
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          tier,
          size,
          color: selectedColor,
          quantity: qtyToAdd,
        },
      ];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => sum + item.tier.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
