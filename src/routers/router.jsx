import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import RouteGuard from "./RouteGuard";
import Loading from "../components/loading";

// Lazy-load semua halaman
const App = lazy(() => import("../App"));
const Home = lazy(() => import("../pages/Home"));
const TopUp = lazy(() => import("../pages/TopUp"));
const Transaction = lazy(() => import("../pages/Transaction"));
const Account = lazy(() => import("../pages/Account"));
const Services = lazy(() => import("../pages/Services"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

// Fungsi wrapper untuk lazy loading
const LazyLoad = (Component) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: LazyLoad(App),
    children: [
      {
        path: "/",
        element: <RouteGuard isPrivate>{LazyLoad(Home)}</RouteGuard>,
      },
      {
        path: "/topup",
        element: <RouteGuard isPrivate>{LazyLoad(TopUp)}</RouteGuard>,
      },
      {
        path: "/transaction",
        element: <RouteGuard isPrivate>{LazyLoad(Transaction)}</RouteGuard>,
      },
      {
        path: "/account",
        element: <RouteGuard isPrivate>{LazyLoad(Account)}</RouteGuard>,
      },
      {
        path: "/service/:service_code",
        element: <RouteGuard isPrivate>{LazyLoad(Services)}</RouteGuard>,
      },
      {
        path: "*",
        element: LazyLoad(NotFound),
      },
    ],
  },
  {
    path: "/login",
    element: <RouteGuard isPrivate={false}>{LazyLoad(Login)}</RouteGuard>,
  },
  {
    path: "/register",
    element: <RouteGuard isPrivate={false}>{LazyLoad(Register)}</RouteGuard>,
  },
]);

export default router;
