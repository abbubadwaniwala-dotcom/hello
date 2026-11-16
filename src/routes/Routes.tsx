import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Discover from "../pages/Discover";
import Category from "../pages/Category";
import NotFound from "../pages/NotFound";
import { CategoriesPage } from "../pages/CatPage";
import { StoreDetailScreen } from "../components/StoreDetailScreen";


export const router = createBrowserRouter([
  // Routes WITHOUT sidebar
  { path: "/login", element: <Login /> },

  // Routes WITH sidebar (nested inside the layout)
  {
    element: <Home />,
    children: [
      { path: "/", element: <Discover /> },
      { path: "/categories", element: <CategoriesPage /> },
      { path: "/settings", element: <Settings /> },
      { path: "/stores", element: <StoreDetailScreen /> },
    ],
  },

  {path: '*', element: <NotFound />}
]);