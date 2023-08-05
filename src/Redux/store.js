import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./TaskSlice/Task";
export const store = configureStore({
    reducer: {
      tasksReducer:taskSlice.reducer
  },
});
