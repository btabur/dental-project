// api.js
import axios from "axios";
import { backendApi } from "../utilis/helper"; // senin kullandığın backend adresi

const api = axios.create({
  baseURL: backendApi,
  withCredentials: true,  // ✅ tüm isteklerde cookie otomatik gönderilir
});

export default api;
