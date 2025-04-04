import "./App.css";
import { Outlet } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="min-h-screen font-sans relative p-6">
      {/* Toggle button - fixed top right */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Example content */}
      <div className="prose dark:prose-invert">
        <h1>Welcome to HiReBOOK</h1>
        <p>
          HiReBOOK is a platform for recruiters and candidates to collaborate on job
          applications, manage interviews, and track progress.
        </p>
        <p>This page is styled using Tailwind Typography plugin.</p>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
