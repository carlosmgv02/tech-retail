import authHeader from "../config/authHeaderService";
import api from "../config/axios";
import type { CartItemType, Purchase } from "../types";

export const getProducts = async (): Promise<CartItemType[]> => {
  const products = await api.get("/products", { headers: authHeader() });
  return products.data;
};

export const fetchProduct = async (id: number) => {
  const response = await api.get<CartItemType>(`/products/${id}`, {
    headers: authHeader(),
  });
  return response.data;
};

export const createCheckoutSession = async (
  cart: CartItemType[],
  email: string
) => {
  const response = await api.post(
    "/stripe/create-checkout-session",
    {
      line_items: getLineItems(cart),
      customer_email: email,
    },
    {
      headers: authHeader(),
    }
  );
  return response.data;
};

export const fetchPurchases = async () => {
  const response = await api.get<Purchase[]>("/purchases", {
    headers: authHeader(),
  });
  return response.data;
};

const getLineItems = (cart: CartItemType[]) => {
  return cart.map((item) => ({
    price: item.stripePriceId,
    quantity: item.amount,
  }));
};
