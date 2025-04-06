import { useSelector } from "react-redux";
import AllNotes from "./views/AllNotes";
import NewNote from "./views/NewNote";
import FolderView from "./views/FolderView";

const views = {
  All: <AllNotes />,
  New: <NewNote />,
  Folders: <FolderView />,
};

export default function NotesPage() {
  const activeTab = useSelector((state) => state.notes.activeTab);
  return <div className="space-y-6">{views[activeTab] || <AllNotes />}</div>;
}
