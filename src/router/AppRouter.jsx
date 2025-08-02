import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Layout from "../pages/Layout/Layout.jsx";
import PostDetails from "../pages/posts/PostDetails.jsx";
import Posts from "../pages/posts/Posts.jsx";
import UserPosts from "../pages/posts/UserPosts.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
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
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts",
        element: (
          <ProtectedRoutes>
            <Posts />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/posts/:postId",
        element: (
          <ProtectedRoutes>
            <PostDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/user-posts",
        element: (
          <ProtectedRoutes>
            <UserPosts />
          </ProtectedRoutes>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();
const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routing} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default AppRouter;
