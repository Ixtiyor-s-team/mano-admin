import { lazy } from "react";
import { PATHS } from "./paths";
const DashboardPage = lazy(() => import("../pages/dashboard/page"));
const NotfoundPage = lazy(() => import("../pages/not-found/page"));

export const routes = [
  {
    path: PATHS.DASHBOARD,
    component: DashboardPage,
  },
  // {
  //   path: PATHS.LOGIN,
  //   component: LoginPage,
  // },
  {
    component: NotfoundPage,
  },
];
