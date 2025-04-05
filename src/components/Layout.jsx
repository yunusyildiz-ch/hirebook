import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PageTransition from "./PageTransition";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <Header />

      {/* Main layout below header */}
      <div className="flex flex-1">
        <Sidebar />
        <PageTransition>
          <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 overflow-y-auto">
            <Outlet />
          </main>
        </PageTransition>
      </div>
    </div>
  );
}