import React from 'react';
import { useParams } from 'react-router-dom';
import { QueryFunctionContext, QueryKey, useQuery } from 'react-query';
import styles from './ProductOverview.module.css';
import type { CartItemType } from '../../types';
import { fetchProduct } from '../../services/productService';

const ProductOverview = () => {
    const { id } = useParams<string>();

    const fetchProductById = async ({ queryKey }: QueryFunctionContext<QueryKey>) => {
        const productId = Number(queryKey[1]);
        return fetchProduct(productId);
    };

    const { data: product, error, isLoading } = useQuery<CartItemType, Error>(
        ['product', id], 
        fetchProductById, 
        { enabled: !!id }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;
    if (!product) return <div>No product found</div>;

    return (
        <div className={styles.container}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>
            <h2 className={styles.price}>${product.price}</h2>
        </div>
    );
};

export default ProductOverview;
