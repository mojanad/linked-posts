import { createRoot } from "react-dom/client";
import "./global.css";
import AppRouter from "./router/AppRouter";
import { UserContextProvider } from "./ context/UserContext";
import "react-loading-skeleton/dist/skeleton.css";
// router handling and add to the main view in the index.html with main.jsx
createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <AppRouter />
  </UserContextProvider>
);
