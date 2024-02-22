// userSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { notifiy } from "../notifications/slice";

import axios, { AxiosError } from "axios";

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  status: boolean;
}

export interface UserState {
  loading: boolean;
  user: User | null;
  error: string | undefined;
}

const initialState: UserState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
  error: undefined,
};

export const loginUser = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { dispatch }) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/auth/login`,
        data
      );
      dispatch(
        notifiy({
          id: Math.floor(Math.random() * 10000) + 1,
          message: "Successfully logged in!",
          type: "success",
          duration: 4000,
        })
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data));

      return response.data.data;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        error.response?.data.errors.map((error: any) => {
          dispatch(
            notifiy({
              id: Math.floor(Math.random() * 10000) + 1,
              message: error.message,
              type: "error",
              duration: 4000,
            })
          );
        });
      }
      throw error; // Re-throw the error to propagate it to the component
    }
  }
);


export const logoutUser = createAsyncThunk("user/logout", async (_, { dispatch }) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch(
      notifiy({
        id: Math.floor(Math.random() * 10000) + 1,
        message: "Successfully logged out!",
        type: "info",
        duration: 4000,
      })
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    data: {
      name: string;
      email: string;
      password: string;
      role: string;
      gender: string;
    },
    { dispatch }
  ) => {
    try {
      await axios.post(`http://localhost:3001/api/auth/register`, data);

      dispatch(
        notifiy({
          id: Math.floor(Math.random() * 10000) + 1,
          message: "Successfully registerd! Please check your email",
          type: "success",
          duration: 4000,
        })
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        error.response?.data.errors.map((error: any) => {
          dispatch(
            notifiy({
              id: Math.floor(Math.random() * 10000) + 1,
              message: error.message,
              type: "error",
              duration: 4000,
            })
          );
        });
      }
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.error = "";
        state.loading = false;
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.user = null;
    })
  },
  reducers: {
    setAuth(state, _) {
      state.user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)
        : null;
    },
  },
});

export const { setAuth } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;
