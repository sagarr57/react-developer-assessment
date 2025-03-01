import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (params: { limit: number; page: number }) => {
  const response = await axios.get(`${API_URL}`, {
    params: { limit: params.limit, skip: (params.page - 1) * params.limit },
  });
  return response.data;
});

interface UserState {
  users: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  totalUsers: number;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  totalUsers: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
