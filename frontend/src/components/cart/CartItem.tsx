import React from "react";
import { Button } from "@mui/material";
import styles from "./CartItem.module.css"; // Import the CSS module

// Types
import { CartItemType } from "../../types";
import { useCart } from "../../context/CartContext";

type Props = {
  item: CartItemType;
};

const CartItem: React.FC<Props> = ({ item }) => {
  const { removeFromCart, addToCart } = useCart();
  return (
    <div className={styles.wrapper}>
      <div>
        <h3>{item.name}</h3>
        <div className={styles.information}>
          <p>Price: €{item.price}</p>
          <p>Total: €{(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className={styles.buttons}>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
            disabled={item.stock <= item.amount}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.imageUrl} alt={item.name} className={styles.img} />
    </div>
  );
};

export default CartItem;
