import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import styles from './ShoppingHistory.module.css';
import type { Purchase } from '../../types';
import { fetchPurchases } from '../../services/productService';
import { formatDate } from '../../utils/dateUtils';
const PurchaseTable: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    fetchPurchases().then(purchasesResponse => setPurchases(purchasesResponse))
  }, []);

  return (
    <TableContainer component={Paper} className={styles.tableContainer}>
      <Table aria-label="purchase table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Total ($)</TableCell>
            <TableCell align="right">Purchase Date</TableCell>
            <TableCell align="right">Items</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell component="th" scope="row">{purchase.id}</TableCell>
              <TableCell align="right">{purchase.total}</TableCell>
              <TableCell align="right">{formatDate(purchase.purchaseDate)}</TableCell>
              <TableCell align="right">
                {purchase.purchaseItems.map(item => (
                  <div key={item.id}>
                    {`${item.product.name}: ${item.quantity} x $${item.priceAtPurchase}`}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PurchaseTable;