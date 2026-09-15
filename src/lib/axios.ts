import axios from "axios";
import Dotenv from "./dotenv";

export const api = axios.create({
  baseURL: Dotenv.VITE_API_URL + "/v2",
});
