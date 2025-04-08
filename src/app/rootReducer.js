import { combineReducers } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";
import candidatesReducer from "../features/candidates/candidatesSlice";
import tasksReducer from "../features/tasks/tasksSlice";
import notesUIReducer from "../features/notes/notesUI.Slice";


const rootReducer = combineReducers({
  notes: notesReducer,
  candidates: candidatesReducer,
  tasks: tasksReducer,
  notesUI: notesUIReducer,
});

export default rootReducer;