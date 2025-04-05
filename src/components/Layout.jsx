import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PageTransition from "./PageTransition";

export default function Layout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <PageTransition>
          <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
            <Outlet />
          </main>
        </PageTransition>
      </div>
    </div>
  );
}