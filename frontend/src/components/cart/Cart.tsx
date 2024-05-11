import React from "react";
import { Button, CardActionArea } from "@mui/material";
import { CartItemType } from "../../types";
import CartItem from "./CartItem";

import styles from "./Cart.module.css"; // Import CSS module
import { Cookie } from "@mui/icons-material";
import Cookies from "js-cookie";
import { createCheckoutSession } from "../../services/productService";
import { useNavigate } from "react-router-dom";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const email = Cookies.get("email");
    if (!email) {
      console.log("Please login first");
      navigate("/login");
    } else {
      const checkout = await createCheckoutSession(cartItems, email);
      window.open(checkout.url);
    }
  };

  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);

  return (
    <div className={styles.container}>
      <div>
        <h2>Your Shopping Cart</h2>
        {cartItems.length === 0 ? <p>No items in the cart.</p> : null}
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
        <h2>Total: €{calculateTotal(cartItems).toFixed(2)}</h2>
      </div>

      {cartItems.length !== 0 ? (
        <button className={styles.button} onClick={handleCheckout}>
          Checkout
        </button>
      ) : null}
    </div>
  );
};

export default Cart;
