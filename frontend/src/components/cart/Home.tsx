import { useState } from 'react';
import { useQuery } from 'react-query';
import styles from './Home.module.css'

//components
import { Drawer } from '@mui/material';
import { LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button'

//Styles
import Item from './Item';
import CartItem from './CartItem';
import Cart from './Cart';

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    imageUrl: string;
    price: number;
    name: string;
    stock: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('http://localhost:3002/products')).json();

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);

    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products',
        getProducts
    );

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.stock, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems((previousItems) => {
            //check if item is already in the cart
            const isItemInCart = previousItems.find(
                (item) => item.id === clickedItem.id
            );

            if (isItemInCart) {
                return previousItems.map((item) =>
                    item.id === clickedItem.id
                        ? { ...item, amount: item.stock + 1 }
                        : item
                );
            }

            //otherwise, add the item for the first time
            return [...previousItems, { ...clickedItem, amount: 1 }];
        });
    };

    const handleRemoveFromCart = (id: number) => {
        setCartItems((previousItems) =>
            previousItems.reduce((ack, item) => {
                if (item.id === id) {
                    if (item.stock === 1) return ack;
                    return [...ack, { ...item, amount: item.stock - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong ...</div>;

    return (
        <div className={styles.wrapper}>
            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            >
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <Button onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCartIcon />
                </Badge>
            </Button>
            <Grid container spacing={3}>
                {data?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default App;