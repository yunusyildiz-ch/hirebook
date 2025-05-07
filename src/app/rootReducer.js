import { combineReducers } from "@reduxjs/toolkit";

import notesReducer from "../features/notes/notesSlice";
import candidatesReducer from "../features/candidates/candidatesSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import foldersReducer from "@/features/folders/foldersSlice";

import notesUIReducer from "../features/notes/notesUI.slice";
import tasksUIReducer from "../features/tasks/tasksUI.slice";
import candidatesUIReducer from "../features/candidates/candidatesUI.slice";
import notificationsReducer from "@notifications/notificationsSlice";
import notificationBadgeReducer from "@notifications/notificationBadgeSlice";
import foldersUIReducer from "@/features/folders/foldersUI.slice";

const rootReducer = combineReducers({
  notes: notesReducer,
  candidates: candidatesReducer,
  tasks: tasksReducer,
  folders: foldersReducer,
  notifications: notificationsReducer,
  notificationBadge: notificationBadgeReducer,

  notesUI: notesUIReducer,
  candidatesUI: candidatesUIReducer,
  tasksUI: tasksUIReducer,
  foldersUI: foldersUIReducer,
});

export default rootReducer;