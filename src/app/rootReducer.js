import { combineReducers } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";
import candidatesReducer from "../features/candidates/candidatesSlice";
import tasksReducer from "../features/tasks/tasksSlice";


const rootReducer = combineReducers({
  notes: notesReducer,
  candidates: candidatesReducer,
  tasks: tasksReducer,
});

export default rootReducer;