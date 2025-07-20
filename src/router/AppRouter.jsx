import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../pages/Layout/Layout.jsx";
import Posts from "../pages/posts/Posts.jsx";
import { UserContextProvider } from "../ context/UserContext.jsx";

const routing = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        index: true,
        element: <Posts />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={routing} />;
};

export default AppRouter;
