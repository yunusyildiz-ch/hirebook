import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { subscribeToNotes } from "../services/noteService";
import { useAuth } from "../contexts/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const [notes, setNotes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid || location.pathname !== "/dashboard") return;
    const unsubscribe = subscribeToNotes(user.uid, setNotes);
    return () => unsubscribe?.();
  }, [user, location]);

  const isNotesPage = location.pathname === "/dashboard";

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg p-4">
      {isNotesPage ? (
        <>
          <h2 className="text-lg font-semibold mb-4">My Notes</h2>
          <ul className="space-y-2">
            {notes.length === 0 ? (
              <p className="text-sm text-gray-400">No notes available.</p>
            ) : (
              notes.map((note) => (
                <li
                  key={note.id}
                  className="text-sm p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer truncate"
                  //todo: not details will be displayed here
                >
                  {note.text}
                </li>
              ))
            )}
          </ul>
        </>
      ) : (
        <p className="text-sm text-gray-400">Sidebar content</p>
      )}
    </aside>
  );
}