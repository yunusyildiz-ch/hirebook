import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Notes from "./pages/Notes";
import Candidates from "./pages/Candidates";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <GuestRoute>
        <HomePage />
      </GuestRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "", // -> /dashboard
        element: <Notes />,
      },
      {
        path: "candidates", // -> /dashboard/candidates
        element: <Candidates />,
      },
      {
        path: "tasks", // -> /dashboard/tasks
        element: <Tasks />,
      },
    ],
  },
]);

export default router;