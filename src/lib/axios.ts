import axios from "axios";
import Cookies from "js-cookie";
import type { PostUserRefreshMutationResult } from "../api/generated";
import Dotenv from "./dotenv";

const api = axios.create({
  baseURL: `${Dotenv.VITE_API_URL}/v2`,
});

let refreshRequest: Promise<PostUserRefreshMutationResult> | null = null;

const refreshSession = (refreshToken: string) => {
  if (!refreshRequest) {
    refreshRequest = axios
      .post<PostUserRefreshMutationResult>(
        `${Dotenv.VITE_API_URL}/v2/user/refresh`,
        {
          refresh_token: refreshToken,
        },
      )
      .then((response) => response.data)
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
};

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = Cookies.get("refresh_token");

      if (!refreshToken) {
        throw new Error("Refresh token yoq");
      }

      const data = await refreshSession(refreshToken);

      Cookies.set("access_token", data.access_token!, {
        expires: data.expires_in! / 86400,
        path: "/",
        secure: Dotenv.NODE_ENV,
        sameSite: "lax",
      });

      if (data.refresh_token) {
        Cookies.set("refresh_token", data.refresh_token, {
          expires: data.refresh_expires_in! / 86400,
          path: "/",
          secure: Dotenv.NODE_ENV,
          sameSite: "lax",
        });
      }

      originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

      return api(originalRequest);
    } catch (refreshError) {
      console.log("REFRESH ERROR:", refreshError);
      console.log("REFRESH TOKEN:", Cookies.get("refresh_token"));

      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });

      return Promise.reject(refreshError);
    }
  },
);

export default api;
