import React from "react";
import { Button } from "@mui/material";
import styles from "./Item.module.css"; // Import the CSS module

// Types
import { CartItemType } from "../../types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

type Props = {
  quantity: number | undefined;
  item: CartItemType;
};

const Item: React.FC<Props> = ({ quantity, item }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleViewMore = () => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div className={styles.wrapper} onClick={handleViewMore}>
      <img src={item.imageUrl} alt={item.name} className={styles.img} />
      <div className={styles.content}>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <h3>€{item.price}</h3>
        <h3>{item.stock} restantes</h3>
      </div>
      <Button
        className={styles.button}
        onClick={(e) => {
          e.stopPropagation();
          addToCart(item);
        }}
        disabled={item.stock <= quantity!}
      >
        {item.stock <= quantity! ? "Out of stock" : "Add to cart"}
      </Button>
    </div>
  );
};
export default Item;
