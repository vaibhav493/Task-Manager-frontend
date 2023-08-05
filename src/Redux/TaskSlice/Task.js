import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getVerificationToken } from "../../userAuthServices";

export const getTasks = createAsyncThunk("getTasks", async () => {
  const res = await axios.get(
    "https://thoughtful-bandanna-deer.cyclic.app/tasks/",
    {
      headers: {
        Authorization: `${getVerificationToken()}`,
      },
    }
  );

  return res.data;
});
export const createTask = createAsyncThunk("createTask", async (task) => {
  try {
    let res = await axios.post(
      "https://thoughtful-bandanna-deer.cyclic.app/tasks/add_new_task",
      task,
      {
        headers: {
          Authorization: `${getVerificationToken()}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {}
});

export const updateTask = createAsyncThunk("updateTask", async (payload) => {
  try {
    const res = await axios.patch(
      `https://thoughtful-bandanna-deer.cyclic.app/tasks/update_task?taskId=${payload.id}`,
      payload.data,
      {
        headers: {
          Authorization: `${getVerificationToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data.data;
  } catch (err) {}
});

export const deleteTask = createAsyncThunk("deleteTask", async (id) => {
  try {
    let res = await axios.delete(
      `https://thoughtful-bandanna-deer.cyclic.app/tasks/delete_task?taskId=${id}`,
      {
        headers: {
          Authorization: `${getVerificationToken()}`,
        },
      }
    );
    return id;
  } catch (err) {}

  return id;
});
const taskSlice = createSlice({
  name: "Tasks",
  initialState: {
    taskData: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.taskData = action.payload;
    });
    builder.addCase(getTasks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.isError = true;
    });
    //fot post or create task
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.taskData.push(action.payload);
    });
    builder.addCase(createTask.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    //fot updat task
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.taskData = state.taskData.map((ele) =>
        ele._id === action.payload._id ? action.payload : ele
      );
    });
    builder.addCase(updateTask.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });

    //fot delete task
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isLoading = false;

      if (action.payload) {
        state.taskData = state.taskData.filter(
          (ele) => ele._id !== action.payload
        );
      }
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default taskSlice;
