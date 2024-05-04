import React from 'react';
import styles from './CheckoutFailed.module.css'; // Importing CSS module
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const CheckoutFailed = () => {
  const navigate = useNavigate()
  const tryAgain = () => {
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <Typography variant="h4" component="h1" gutterBottom color="error">
        Checkout Failed
      </Typography>
      <Typography variant="body1">
        We encountered a problem during your checkout process. Please try again or contact support if the issue persists.
      </Typography>
      <Button variant="contained" color="secondary" className={styles.button} onClick={tryAgain}>
        Try Again
      </Button>
    </div>
  );
}

export default CheckoutFailed;