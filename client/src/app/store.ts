import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import blogReducer from "../features/blogSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blog: blogReducer,
  },
  devTools: import.meta.env.VITE_ENV === "DEV",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

export default store;
