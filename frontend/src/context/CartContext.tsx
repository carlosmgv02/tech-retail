import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import type { CartItemType } from "../types";

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (clickedItem: CartItemType) => {
    setCartItems((previousItems) => {
      const isItemInCart = previousItems.find(
        (item) => item.id === clickedItem.id
      );
      if (isItemInCart) {
        return previousItems.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...previousItems, { ...clickedItem, amount: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((previousItems) =>
      previousItems.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  const getTotalItems = () =>
    cartItems.reduce((ack, item) => ack + item.amount, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
