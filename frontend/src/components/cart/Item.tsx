import React from 'react';
import { Button } from '@mui/material';
import styles from './Item.module.css'; // Import the CSS module

// Types
import { CartItemType } from '../../types';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <div className={styles.wrapper}>
        <img src={item.image} alt={item.title} className={styles.img} />
        <div className={styles.content}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button className={styles.button} onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </div>
);

export default Item;
