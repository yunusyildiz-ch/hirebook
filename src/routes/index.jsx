import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import NotesPage from "@/features/notes/NotesPage";
import Candidates from "@/pages/Candidates";
import Tasks from "@/pages/Tasks";
import ProtectedRoute from "@/routes/ProtectedRoute";
import GuestRoute from "@/routes/GuestRoute";
import HomePage from "@/pages/HomePage";

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
        path: "notes",
        element: <NotesPage />,
      },
      {
        path: "candidates",
        element: <Candidates />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
    ],
  },
]);

export default router;