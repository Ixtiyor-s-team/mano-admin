import { lazy } from "react";
import { PATHS } from "./paths";
const DashboardPage = lazy(() => import("../pages/dashboard/page"));
const NotfoundPage = lazy(() => import("../pages/not-found/page"));
const GenresPage = lazy(() => import("../pages/genres/page"));

export const routes = [
  {
    path: PATHS.DASHBOARD,
    component: DashboardPage,
  },
  {
    path: PATHS.GENRES,
    component: GenresPage,
  },
  {
    component: NotfoundPage,
  },
];
