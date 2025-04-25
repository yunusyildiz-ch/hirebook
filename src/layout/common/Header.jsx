// src/layout/common/Header.jsx
import { useLocation } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import NotesBar from "@/features/notes/components/NotesBar";
import CandidatesBar from "@/features/candidates/components/CandidatesBar";
import TasksBar from "@/features/tasks/components/TasksBar";
import { useDispatch } from "react-redux";
import {
  setSearchTerm as setNotesSearch,
} from "@/features/notes/notesUI.slice";
import {
  setSearchTerm as setCandidatesSearch,
} from "@/features/candidates/candidatesUI.slice";
import {
  setSearchTerm as setTasksSearch,
} from "@/features/tasks/tasksUI.slice";
import { useState, useEffect } from "react";

export default function Header({ onToggleSidebar }) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const path = location.pathname;

  useEffect(() => {
    setSearch(""); // Clear search input when path changes
  }, [path]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (path.includes("/notes")) dispatch(setNotesSearch(value));
    else if (path.includes("/candidates")) dispatch(setCandidatesSearch(value));
    else if (path.includes("/tasks")) dispatch(setTasksSearch(value));
  };

  const getTitle = () => {
    if (path.includes("/notes")) return "Notes";
    if (path.includes("/candidates")) return "Candidates";
    if (path.includes("/tasks")) return "Tasks";
    if (path.includes("/admin/users")) return "User Management";
    if (path.includes("/admin")) return "Admin Dashboard";
    return "Dashboard";
  };

  const getPlaceholder = () => {
    if (path.includes("/notes")) return "Search notes...";
    if (path.includes("/candidates")) return "Search candidates...";
    if (path.includes("/tasks")) return "Search tasks...";
    return "Search...";
  };

  const renderDynamicContent = () => {
    if (path.includes("/notes")) return <NotesBar />;
    if (path.includes("/candidates")) return <CandidatesBar />;
    if (path.includes("/tasks")) return <TasksBar />;
    return null;
  };

  return (
    <header className="sticky top-0 z-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-xl font-semibold">{getTitle()}</h1>
        </div>

        {/* Search Input */}
        <div className="relative hidden md:block w-64">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder={getPlaceholder()}
            className="w-full rounded-lg px-3 py-1 bg-gray-100 dark:bg-gray-700 text-sm dark:text-white focus:outline-none"
          />
          <Search
            size={16}
            className="absolute top-1.5 right-2 text-gray-400 dark:text-gray-300"
          />
        </div>
      </div>

      {/* Tabs */}
      <div>{renderDynamicContent()}</div>
    </header>
  );
}