import { lazy } from "react";
import { PATHS } from "./paths";
const DashboardPage = lazy(() => import("../pages/dashboard/page"));
const NotfoundPage = lazy(() => import("../pages/not-found/page"));
const MangaPage = lazy(() => import("../pages/manga/page"));
const GenresPage = lazy(() => import("../pages/genres/page"));
const UsersPage = lazy(() => import("../pages/users/page"));
const EmployeesPage = lazy(() => import("../pages/employees/page"));

export const routes = [
  {
    path: PATHS.DASHBOARD,
    component: DashboardPage,
  },
  {
    path: PATHS.MANGAS,
    component: MangaPage,
  },
  {
    path: PATHS.GENRES,
    component: GenresPage,
  },
  {
    path: PATHS.USERS,
    component: UsersPage,
  },
  {
    path: PATHS.EMPLOYEES,
    component: EmployeesPage,
  },
  {
    component: NotfoundPage,
  },
];
