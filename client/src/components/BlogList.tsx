import { useDispatch, useSelector } from "react-redux";
import { Blog as BlogType, selectBlogs, setBlogs } from "../features/blogSlice";
import Blog from "../components/Blog";
import { useEffect, useState } from "react";
import { Box, LoadingOverlay, Stack } from "@mantine/core";

export default function BlogList() {
  const blogs = useSelector(selectBlogs);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  async function fetchBlogs(controller: AbortController) {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
        signal: controller.signal,
      });
      const blogs: BlogType[] = await response.json();
      if (Array.isArray(blogs)) dispatch(setBlogs(blogs));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    const controller = new AbortController();
    fetchBlogs(controller);
    return () => controller.abort();
  }, []);

  return (
    <Box pos={"relative"}>
      <LoadingOverlay
        overlayColor="#c5c5c5"
        visible={isLoading}
      />
      <Stack>
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog._id} />
        ))}
      </Stack>
    </Box>
  );
}
