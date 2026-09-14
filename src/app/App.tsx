import "@mantine/core/styles.css";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import { routes } from "../lib/routes";
import AdminLayout from "../layouts/AdminLayout";
import { PATHS } from "../lib/paths";
import LoadingPage from "../pages/loading/page";

const LoginPage = lazy(() => import("../pages/login/page"));

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Switch>
        <Route path={PATHS.LOGIN} component={LoginPage} />
        {routes.map((route) => {
          return (
            <Route
              key={route.path}
              path={route.path}
              component={() => (
                <AdminLayout>
                  <route.component />
                </AdminLayout>
              )}
            />
          );
        })}

        {/* <Route
          component={() => (
            <AdminLayout>
              <NotFound />
            </AdminLayout>
          )}
        /> */}
      </Switch>
    </Suspense>
  );
}

export default App;
