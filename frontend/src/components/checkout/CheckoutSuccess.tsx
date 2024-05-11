// CheckoutSuccess.tsx
import React from "react";
import styles from "./CheckoutSuccess.module.css"; // Importing CSS module
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  const goToOrders = () => {
    navigate("/history");
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout Successful!
      </Typography>
      <Typography variant="body1">
        Your order has been placed and is being processed. More details have
        been sent to your email. Thank you for shopping with us!
      </Typography>
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={goToOrders}
        >
          Go to Orders
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={goHome}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
