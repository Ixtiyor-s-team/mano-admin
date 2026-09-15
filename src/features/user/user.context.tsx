"use client";
import React, { createContext, useContext } from "react";
import Cookies from "js-cookie";
import Dotenv from "../../lib/dotenv";
import { appNotification } from "../../lib/app-notification";
import {
  getGetUserIdQueryKey,
  useGetUserId,
  usePostUserVerify,
} from "../../api/generated";
import { getUserIdFromToken } from "../../lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import type { ResponseUserResponse } from "../../api/model";

interface AuthContextType {
  loading: boolean;
  mutationPending: boolean;
  logout: () => Promise<void>;
  login: (code: string) => void;
  user: ResponseUserResponse | undefined;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const queryClient = useQueryClient();
  const access_token = Cookies.get("access_token");
  const userId = access_token ? getUserIdFromToken(access_token) : null;
  const { mutate, isPending } = usePostUserVerify();
  const { data, isLoading } = useGetUserId(userId ?? "", {
    query: {
      enabled: !!userId && !!access_token,
    },
  });

  const login = (code: string) => {
    mutate(
      { data: { code } },
      {
        onSuccess: (res) => {
          const {
            access_token,
            refresh_token,
            expires_in,
            refresh_expires_in,
            user: userData,
          } = res;

          Cookies.set("access_token", access_token!, {
            expires: expires_in! / 86400,
            path: "/",
            secure: Dotenv.NODE_ENV === "production",
            sameSite: "lax",
          });

          Cookies.set("refresh_token", refresh_token!, {
            expires: refresh_expires_in! / 86400,
            path: "/",
            secure: Dotenv.NODE_ENV === "production",
            sameSite: "lax",
          });

          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
          }
          queryClient.invalidateQueries({
            queryKey: getGetUserIdQueryKey(userData!.id!),
          });
          appNotification.success("Hisobga kirdingiz!");
        },
        onError: (error: any) => {
          const msg = error.response.data.error;
          appNotification.error(msg);
        },
      },
    );
  };
  const logout = async () => {
    Cookies.remove("access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        loading: isLoading,
        logout,
        login,
        user: data,
        mutationPending: isPending,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an UserProvider");
  }

  return context;
};
