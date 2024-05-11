import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QueryFunctionContext, QueryKey, useQuery } from "react-query";
import styles from "./ProductOverview.module.css"; // Ensure the CSS module is updated as per the new styles
import type { CartItemType } from "../../types";
import { fetchProduct } from "../../services/productService";
import "../../App.css";
import { useCart } from "../../context/CartContext";

const ProductOverview = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { id } = useParams<string>();

  const handleAddToCart = (product: CartItemType) => {
    addToCart(product);
    navigate("/");
  };

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

  return (
    <section className="app">
      <div className="details">
        <div className="large-img-wrapper">
          <img src={product.imageUrl} alt="largeImg" className="large-img" />
        </div>

        <div className="box">
          <div className="row">
            <h2>{product.name}</h2>
            <span>{product.price} $</span>
          </div>
          <p>{product.description}</p>
          <p>In stock: {product.stock}</p>
          <button
            className="add-to-cart"
            onClick={() => handleAddToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;
