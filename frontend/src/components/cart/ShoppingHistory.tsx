import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import FileDownload from "@mui/icons-material/FileDownload";
import styles from "./ShoppingHistory.module.css";
import type { Purchase } from "../../types";
import { fetchPurchases } from "../../services/productService";
import { formatDate } from "../../utils/dateUtils";
import { downloadPdf } from "../../services/purchaseService";
const PurchaseTable: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    fetchPurchases().then((purchasesResponse) =>
      setPurchases(purchasesResponse)
    );
  }, []);

  const handleDownloadPdf = async (purchaseId: number) => {
    try {
      const response = await downloadPdf(purchaseId);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Purchase_${purchaseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading the PDF", error);
    }
  };

  return (
    <div className={styles.container}>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table aria-label="purchase table">
          <TableHead>
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell align="right">Total ($)</TableCell>
              <TableCell align="right">Purchase Date</TableCell>
              <TableCell align="right">Invoice</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell align="left">
                  {purchase.purchaseItems.map((item) => (
                    <ul key={item.id}>
                      <li>
                        {item.product.name} x {item.quantity}
                      </li>
                    </ul>
                  ))}
                </TableCell>
                <TableCell align="right">{purchase.total}</TableCell>
                <TableCell align="right">
                  {formatDate(purchase.purchaseDate)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<FileDownload />}
                    onClick={() => handleDownloadPdf(purchase.id)}
                  >
                    Download PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PurchaseTable;
