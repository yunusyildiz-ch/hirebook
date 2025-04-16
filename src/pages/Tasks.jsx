import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "@/features/tasks/components/TaskCard";
import TaskDetail from "@/features/tasks/components/TaskDetail";
import TaskEditor from "@/features/tasks/components/TaskEditor";
import ConfirmModal from "@modals/ConfirmModal";
import {
  selectAllTasks,
  selectActiveTab,
  selectViewMode,
  selectSelectedTask,
  selectSearchTerm,
} from "@/features/tasks/tasksSelectors";
import {
  setViewMode,
  clearSelectedTask,
  setSelectedTask,
} from "@/features/tasks/tasksUI.slice";
import {
  startTasksListener,
  addTaskThunk,
  updateTaskThunk,
  deleteTaskThunk,
} from "@/features/tasks/tasksThunks";

export default function Tasks() {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const viewMode = useSelector(selectViewMode);
  const activeTab = useSelector(selectActiveTab);
  const selectedTask = useSelector(selectSelectedTask);
  const searchTerm = useSelector(selectSearchTerm);

  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    dispatch(startTasksListener());
  }, [dispatch]);

  const filteredTasks = tasks.filter((task) => {
    const matchesTab = activeTab === "All" || task.status === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSave = (task) => {
    if (!task.id) {
      dispatch(addTaskThunk(task));
    } else {
      dispatch(updateTaskThunk(task));
    }
  };

  const handleDeleteRequest = (task) => {
    setTaskToDelete(task);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!taskToDelete) return;
    dispatch(deleteTaskThunk(taskToDelete.id));
    dispatch(clearSelectedTask());
    dispatch(setViewMode("list"));
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  if (viewMode === "edit") {
    return <TaskEditor task={selectedTask} onSave={handleSave} />;
  }

  if (viewMode === "view" && selectedTask) {
    return (
      <>
        <TaskDetail />
        <ConfirmModal
          isOpen={showConfirm}
          title="Delete Task"
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-end px-6 pb-4">
        <button
          onClick={() => {
            dispatch(clearSelectedTask());
            dispatch(setViewMode("edit"));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + New Task
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={handleDeleteRequest}
          />
        ))}
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}