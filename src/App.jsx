import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-blue-600 mb-4">HiReBOOK</h1>
      <div className="prose dark:prose-invert">
        <h1>Welcome to HiReBOOK</h1>
        <p>This page is styled using Tailwind Typography plugin.</p>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
