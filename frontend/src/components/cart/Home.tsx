import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styles from "./Home.module.css";
import { getProducts } from "../../services/productService";

//components
import { Drawer } from "@mui/material";
import { LinearProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

//Styles
import Item from "./Item";
import CartItem from "./CartItem";
import Cart from "./Cart";
import { useCart } from "../../context/CartContext";

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
  name: string;
  stock: number;
  amount: number;
  stripePriceId: string;
};

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState<CartItemType[]>([]);
  const { cartItems, getTotalItems } = useCart();

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const categories = ["all", ...new Set(data?.map((item) => item.category))];

  const findItemWithId = (id: number) => {
    return cartItems.find((item) => item.id === id);
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.drawerButton}>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          displayEmpty
          className={styles.categorySelector}
        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => setCartOpen(false)}
        >
          <Cart cartItems={cartItems} />
        </Drawer>
        <Button onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems()} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </Button>
      </div>

      <Grid container spacing={3}>
        {products
          ?.filter((item) => category === "all" || item.category === category)
          .map((item) => {
            const productItem = findItemWithId(item.id);

            return (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item quantity={productItem?.amount} item={item} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};

export default App;
