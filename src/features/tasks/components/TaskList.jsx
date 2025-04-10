import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";
import {
  selectAllTasks,
  selectActiveTab,
  selectSearchTerm,
} from "../tasksSelectors";

export default function TaskList() {
  const tasks = useSelector(selectAllTasks);
  const activeTab = useSelector(selectActiveTab);
  const searchTerm = useSelector(selectSearchTerm);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = activeTab === "All" || task.status === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!filteredTasks.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No tasks found.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}