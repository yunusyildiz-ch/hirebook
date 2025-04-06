// src/components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import UserPanel from "./user.panel/UserPanel";
import PageTransition from "../PageTransition";

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <UserPanel />
    </div>
  );
}