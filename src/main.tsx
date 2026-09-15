import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./app/App.tsx";
import { MantineProvider } from "@mantine/core";
import { theme } from "./lib/theme/index.ts";
import { Notifications } from "@mantine/notifications";
import { UserProvider } from "./features/user/user.context.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <UserProvider>
          <Notifications />
          <App />
        </UserProvider>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
