import { useLocation } from "react-router-dom";
import NotesBar from "@/features/notes/NotesBar";
import TasksBar from "@/features/tasks/TasksBar";
import CandidatesBar from "@/features/candidates/CandidatesBar";

export default function Header() {
  const location = useLocation();

  if (location.pathname.startsWith("/dashboard/notes")) return <NotesBar />;
  if (location.pathname.startsWith("/dashboard/tasks")) return <TasksBar />;
  if (location.pathname.startsWith("/dashboard/candidates")) return <CandidatesBar />;

  return <div className="h-14 w-full bg-white dark:bg-gray-900 border-b" />;
}
