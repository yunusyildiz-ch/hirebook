import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Notes from "./pages/Notes";
import Candidates from "./pages/Candidates";
import Tasks from "./pages/Tasks";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Notes />,
      },
      {
        path: "/candidates",
        element: <Candidates />,
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
    ],
  },
]);

export default router;