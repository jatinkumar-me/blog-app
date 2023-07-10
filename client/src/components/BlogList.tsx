import { useDispatch, useSelector } from "react-redux";
import { Blog as BlogType, selectBlogs, setBlogs } from "../features/blogSlice";
import Blog from "../components/Blog";
import { useEffect } from "react";
import { Stack } from "@mantine/core";

export default function BlogList() {
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch();
  async function fetchBlogs(controller: AbortController) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        signal: controller.signal,
      });
      const blogs: BlogType[] = await response.json();
      if (Array.isArray(blogs)) dispatch(setBlogs(blogs));
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    fetchBlogs(controller);
    console.log(blogs);
    return () => controller.abort();
  }, []);

  return (
    <Stack>
      {blogs.map((blog) => (
        <Blog blog={blog} key={blog._id} />
      ))}
    </Stack>
  );
}
