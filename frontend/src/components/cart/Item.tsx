import React from 'react';
import { Button } from '@mui/material';
import styles from './Item.module.css'; // Import the CSS module

// Types
import { CartItemType } from '../../types';
import { useNavigate } from 'react-router-dom';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
    const navigate = useNavigate();

    const handleViewMore = () => {
        navigate(`/item/${item.id}`);
    };

    return (
        <div className={styles.wrapper} onClick={handleViewMore}>
            <img src={item.imageUrl} alt={item.name} className={styles.img} />
            <div className={styles.content}>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <h3>${item.price}</h3>
            </div>
            <Button className={styles.button} onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(item);
            }}>Add to cart</Button>
        </div>
    );
};
export default Item;
