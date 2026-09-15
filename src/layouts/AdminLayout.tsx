import React from "react";
import Sidebar from "../components/shared/Sidebar";
import Navbar from "../components/shared/Navbar";
import { Box } from "@mantine/core";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <Box
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyItems: "start",
        }}
      >
        <Sidebar />
        <Box h={"100%"} w={"100%"} flex={1}>
          <Navbar />
          <main style={{ padding: "10px" }}>{children}</main>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
