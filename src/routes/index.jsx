import { createBrowserRouter } from "react-router-dom";
import Layout from "@/layout/Layout";
import AdminLayout from "@/layout/admin/AdminLayout";
import Notes from "@pages/Notes";
import Candidates from "@pages/Candidates";
import Tasks from "@pages/Tasks";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import HomePage from "@pages/HomePage";
import AdminDashboard from "@pages/AdminDashboard";
import Unauthorized from "@pages/Unauthorized";
import UserManagement from "@pages/UserManagement";

const router = createBrowserRouter([
  // 🏠 Public Home Page (Guest Only)
  {
    path: "/",
    element: (
      <GuestRoute>
        <HomePage />
      </GuestRoute>
    ),
  },

  // 🔐 Protected Dashboard for Authenticated Users
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "notes", element: <Notes /> },
      { path: "candidates", element: <Candidates /> },
      { path: "tasks", element: <Tasks /> },
    ],
  },

  // 🛡 Admin-Only Section with Admin Layout
  {
    path: "/admin",
    element: (
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </RoleProtectedRoute>
    ),
    children: [
      {
        index: true, // 👈 AdminDashboard is the default route when visiting "/admin"
        element: <AdminDashboard />,
      },
      {
        path: "users",
        element: <UserManagement />,
      },
    ],
  },

  // 🚫 Unauthorized Access Page
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

export default router;
