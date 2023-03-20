import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import LoginView from "./routes/LoginView";
import DashboardView from "./routes/DashboardView";
import EditProfileView from "./routes/EditProfileView";
import PublicProfileView from "./routes/PublicProfileView";
import ChooseUsernameView from "./routes/ChooseUsernameView";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Root /> },
  { path: "login", element: <LoginView /> },
  { path: "dashboard", element: <DashboardView /> },
  { path: "dashboard/profile", element: <EditProfileView /> },
  { path: "u/:username", element: <PublicProfileView /> },
  { path: "choose-username", element: <ChooseUsernameView /> },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
