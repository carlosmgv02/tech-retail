import authHeader from "../config/authHeaderService";
import api from "../config/axios";

export const downloadPdf = async (purchaseId: number) => {
  const response = await api.get(`/purchases/${purchaseId}/pdf`, {
    responseType: "blob",
    headers: authHeader(),
  });
  return response;
};
