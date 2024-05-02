import React from 'react';
import { Button, CardActionArea } from '@mui/material';
import { CartItemType } from '../../types';
import CartItem from './CartItem';

import styles from './Cart.module.css'; // Import CSS module

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.stock * item.price, 0);

    return (
        <div className={styles.container}> {/* Use styles.wrapper instead of <Wrapper> */}
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
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </div>
    );
};

export default Cart;
