//axios.ts
import axios from "axios";
import { config } from "../consts/apiUrlConsts";

const api = axios.create({
  baseURL: config.url.API_URL,
});

export default api;
