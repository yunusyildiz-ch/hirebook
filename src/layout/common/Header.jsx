import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  StickyNote,
  Users,
  CheckSquare,
  Folder,
  Search,
} from "lucide-react";

import NotesBar from "@/features/notes/components/NotesBar";
import CandidatesBar from "@/features/candidates/components/CandidatesBar";
import TasksBar from "@/features/tasks/components/TasksBar";
import FoldersBar from "@/features/folders/components/FoldersBar";

import { setSearchTerm as setNotesSearch } from "@/features/notes/notesUI.slice";
import { setSearchTerm as setCandidatesSearch } from "@/features/candidates/candidatesUI.slice";
import { setSearchTerm as setTasksSearch } from "@/features/tasks/tasksUI.slice";
import { setSearchTerm as setFoldersSearch } from "@/features/folders/foldersUI.slice";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const path = location.pathname;

  useEffect(() => {
    setSearch("");
  }, [path]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (path.includes("/notes")) dispatch(setNotesSearch(value));
    else if (path.includes("/candidates")) dispatch(setCandidatesSearch(value));
    else if (path.includes("/tasks")) dispatch(setTasksSearch(value));
    else if (path.includes("/folders")) dispatch(setFoldersSearch(value));
  };

  const getPlaceholder = () => {
    if (path.includes("/notes")) return "Search notes...";
    if (path.includes("/candidates")) return "Search candidates...";
    if (path.includes("/tasks")) return "Search tasks...";
    if (path.includes("/folders")) return "Search folders...";
    return "Search...";
  };

  const renderDynamicContent = () => {
    if (path.includes("/notes")) return <NotesBar />;
    if (path.includes("/candidates")) return <CandidatesBar />;
    if (path.includes("/tasks")) return <TasksBar />;
    if (path.includes("/folders")) return <FoldersBar />;
    return null;
  };

  // Icon Menu Items
  const menuItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={22} />, match: (p) => p === "/dashboard" },
    { to: "/dashboard/notes", icon: <StickyNote size={22} />, match: (p) => p.includes("/notes") },
    { to: "/dashboard/candidates", icon: <Users size={22} />, match: (p) => p.includes("/candidates") },
    { to: "/dashboard/tasks", icon: <CheckSquare size={22} />, match: (p) => p.includes("/tasks") },
    { to: "/dashboard/folders", icon: <Folder size={22} />, match: (p) => p.includes("/folders") },
  ];

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-800 transition-colors duration-300 dark:border-gray-700 border-b border-gray-200">
      {/* Desktop Top Area */}
      <div className="hidden md:flex items-center justify-between px-6 pt-4 pb-2">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
          {path.includes("/notes")
            ? "Notes"
            : path.includes("/candidates")
            ? "Candidates"
            : path.includes("/tasks")
            ? "Tasks"
            : path.includes("/folders")
            ? "Folders"
            : "Dashboard"}
        </h1>

        {/* Search */}
        <div className="relative w-64">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder={getPlaceholder()}
            className="w-full rounded-lg px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm dark:text-white focus:outline-none transition-colors duration-300"
          />
          <Search
            size={16}
            className="absolute top-1.5 right-2 text-gray-400 dark:text-gray-300 transition-colors duration-300"
          />
        </div>
      </div>

      {/* Mobile Top Area */}
      <div className="flex md:hidden items-center justify-between px-3 py-2 gap-3">
        {/* Icon Menu */}
        <div className="flex gap-5 flex-shrink-0">
          {menuItems.map((item) => {
            const isActive = item.match(path);
            return (
              <button
                key={item.to}
                onClick={() => navigate(item.to)}
                className={`p-2 rounded-full transition-colors duration-300 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {item.icon}
              </button>
            );
          })}
        </div>

        {/* Mobile Search */}
        <div className="relative w-40">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder={getPlaceholder()}
            className="w-full rounded-lg px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm dark:text-white focus:outline-none transition-colors duration-300"
          />
          <Search
            size={16}
            className="absolute top-1.5 right-2 text-gray-400 dark:text-gray-300 transition-colors duration-300"
          />
        </div>
      </div>

      {/* Tabs (NotesBar, CandidatesBar, TasksBar, FoldersBar) */}
      <div>{renderDynamicContent()}</div>
    </header>
  );
}
