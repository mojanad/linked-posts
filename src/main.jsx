import { createRoot } from "react-dom/client";
import "./global.css";
import AppRouter from "./router/AppRouter";

// router handling and add to the main view in the index.html with main.jsx
createRoot(document.getElementById("root")).render(<AppRouter />);
