import { combineReducers } from "@reduxjs/toolkit";

import notesReducer from "../features/notes/notesSlice";
import candidatesReducer from "../features/candidates/candidatesSlice";
import tasksReducer from "../features/tasks/tasksSlice";

import notesUIReducer from "../features/notes/notesUI.slice";
import tasksUIReducer from "../features/tasks/tasksUI.slice";
import candidatesUIReducer from "../features/candidates/candidatesUI.slice";
import notificationsReducer from "@notifications/notificationsSlice";
import notificationBadgeReducer from "@notifications/notificationBadgeSlice";

const rootReducer = combineReducers({
  notes: notesReducer,
  candidates: candidatesReducer,
  tasks: tasksReducer,
  notifications: notificationsReducer,
  notificationBadge: notificationBadgeReducer,

  notesUI: notesUIReducer,
  tasksUI: tasksUIReducer,
  candidatesUI: candidatesUIReducer,
});

export default rootReducer;