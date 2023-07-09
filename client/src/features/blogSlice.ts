import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export type Blog = {
  content: Object;
  userId: string;
};

type BlogState = {
  blogs: Blog[];
};

const initialBlogState: BlogState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialBlogState,
  reducers: {
    setBlogs: (state, action) => {
      const { blogs } = action.payload;
      state.blogs = blogs;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export const selectBlogs = (state: RootState) => state.blog.blogs;

export default blogSlice.reducer;
