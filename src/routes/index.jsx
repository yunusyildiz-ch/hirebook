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
import LegalLayout from "@layout/LegalLayout";
import TermsPage from "@pages/legal/TermsPage";
import PrivacyPage from "@pages/legal/PrivacyPage";
import CookiesPage from "@pages/legal/CookiesPage";
import TestPage from "@pages/TestPage";
import AuthActionHandler from "@pages/AuthActionHandler";

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

  // 🛡 Admin-Only Section
  {
    path: "/admin",
    element: (
      <RoleProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </RoleProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "users", element: <UserManagement /> },
    ],
  },

  // 🔥 Auth Action Handler (Verify Email, Reset Password, Recover Email)
  {
    path: "/auth-action",
    element: <AuthActionHandler />,
  },

  // 📜 Legal Pages
  {
    path: "/legal",
    element: <LegalLayout />,
    children: [
      { path: "terms", element: <TermsPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "cookies", element: <CookiesPage /> },
    ],
  },

  // 🚫 Unauthorized
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },

  // 🧪 Test Cookie Page
  {
    path: "/test-cookie",
    element: <TestPage />,
  },
]);

export default router;