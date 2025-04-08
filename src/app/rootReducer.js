import { combineReducers } from "@reduxjs/toolkit";

import notesReducer from "../features/notes/notesSlice";
import candidatesReducer from "../features/candidates/candidatesSlice";
import tasksReducer from "../features/tasks/tasksSlice";

import notesUIReducer from "../features/notes/notesUI.slice";
import tasksUIReducer from "../features/tasks/tasksUI.slice";
import candidatesUIReducer from "../features/candidates/candidatesUI.slice";

const rootReducer = combineReducers({
  notes: notesReducer,
  candidates: candidatesReducer,
  tasks: tasksReducer,

  notesUI: notesUIReducer,
  tasksUI: tasksUIReducer,
  candidatesUI: candidatesUIReducer,
});

export default rootReducer;