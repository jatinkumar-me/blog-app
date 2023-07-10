import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type User = {
  fullName: string;
  email: string;
  password: string;
  blogDraft?: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
};

const initialUserState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialUserState,
  reducers: {
    setCredentials: (state, action: { payload: AuthState; type: string }) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    setBlogDraft: (state, action: { payload: string; type: string }) => {
      if (state.user) state.user.blogDraft = action.payload;
    },
    logout: () => initialUserState,
  },
});

export const { logout, setCredentials, setBlogDraft } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
