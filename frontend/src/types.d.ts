export interface CartItemType {
  id: number;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  name: string;
  stock: number;
  amount: number;
  stripePriceId: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
  stock: number;
  stripePriceId: string;
}

interface PurchaseItem {
  id: number;
  quantity: number;
  priceAtPurchase: string;
  product: Product;
}

interface Purchase {
  id: number;
  total: string;
  purchaseDate: string;
  purchaseItems: PurchaseItem[];
}
