import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { User } from "./authSlice";

export type Blog = {
  content: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  userId: User;
};

type BlogState = {
  blogs: Blog[];
};

const initialBlogState: BlogState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialBlogState,
  reducers: {
    setBlogs: (state, action: { payload: Blog[]; type: string }) => {
      const blogs = action.payload;
      state.blogs = blogs;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export const selectBlogs = (state: RootState) => state.blog.blogs;

export default blogSlice.reducer;
