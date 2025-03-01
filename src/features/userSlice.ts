import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://dummyjson.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (limit: number = 5) => {
  const response = await axios.get(`${API_URL}?limit=${limit}`);
  return response.data.users;
});

interface UserState {
  users: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  users: [],
  status: "idle",
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
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
