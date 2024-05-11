import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { QueryFunctionContext, QueryKey, useQuery } from "react-query";
import styles from "./ProductOverview.module.css"; // Ensure the CSS module is updated as per the new styles
import type { CartItemType } from "../../types";
import { fetchProduct } from "../../services/productService";

const ProductOverview = () => {
  const { id } = useParams<string>();
  const colors = ["blue", "green", "red"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const fetchProductById = async ({
    queryKey,
  }: QueryFunctionContext<QueryKey>) => {
    const productId = Number(queryKey[1]);
    return fetchProduct(productId);
  };

  const {
    data: product,
    error,
    isLoading,
  } = useQuery<CartItemType, Error>(["product", id], fetchProductById, {
    enabled: !!id,
  });

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error)
    return (
      <div className={styles.error}>An error occurred: {error.message}</div>
    );
  if (!product) return <div className={styles.noProduct}>No product found</div>;

  const handleColorSelect = (color: typeof selectedColor) => {
    setSelectedColor(color);
  };
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productImage}
        />
      </div>
      <div className={styles.details}>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <h1 className={styles.title}>{product.name}</h1>
          <h2 className={styles.price}>€{product.price}</h2>
        </div>
        <div className={styles.colors}>
          Colors:
          {colors.map((color, index) => (
            <button
              key={index}
              className={styles.colorSwatch}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color)}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
        <p className={styles.description}>{product.description}</p>
        <button className={styles.addButton}>Add to Basket</button>
      </div>
    </div>
  );
};

export default ProductOverview;
