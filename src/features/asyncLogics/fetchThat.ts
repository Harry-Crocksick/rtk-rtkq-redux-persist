import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../lib/types";
import type { InitialState } from "../../lib/types";

export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return response.json();
  }
);

const initialState = {
  entities: [] as User[],
  status: "idle",
} satisfies InitialState as InitialState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUserById.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.entities.push(action.payload);
      }
    );
  },
});

export default usersSlice.reducer;
