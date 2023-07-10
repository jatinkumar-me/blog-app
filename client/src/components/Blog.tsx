import {
  ActionIcon,
  Box,
  Divider,
  Flex,
  Group,
  Menu,
  Paper,
  Spoiler,
  Text,
} from "@mantine/core";
import { Blog as BlogType, setBlogs } from "../features/blogSlice";
import { timeAgo } from "../utils/timeAgo";
import { IconArrowsLeftRight, IconDots, IconTrash } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { selectToken } from "../features/authSlice";
import { modals } from "@mantine/modals";

type PropType = {
  blog: BlogType;
};
export default function Blog({ blog }: PropType) {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  async function deleteBlog() {
    try {
      if (!token) {
        modals.openContextModal({
          modal: "authorization",
          title: "Authentication",
          innerProps: {},
        });
        return;
      }
      console.log("deleting");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/blogs/${blog._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const blogs: BlogType[] = await response.json();
      console.log(blogs);
      if (Array.isArray(blogs)) dispatch(setBlogs(blogs));
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Paper withBorder>
      <Flex justify={"space-between"} p={"md"}>
        <Group spacing={5}>
          <Text>{blog.userId.fullName}</Text>·
          <Text size={"xs"}>{`${timeAgo(blog.createdAt)} ago`}</Text>
        </Group>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon>
              <IconDots />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>Actions</Menu.Label>
            <Menu.Item icon={<IconArrowsLeftRight size={14} />}>
              Share
            </Menu.Item>
            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>

            <Menu.Item
              color="red"
              icon={<IconTrash size={14} />}
              onClick={deleteBlog}
            >
              Delete Blog
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
      <Divider />
      <Spoiler
        maxHeight={120}
        showLabel="Show more"
        hideLabel="Hide"
        transitionDuration={0}
        px={"md"}
      >
        <Box dangerouslySetInnerHTML={{ __html: blog.content }}></Box>
      </Spoiler>
    </Paper>
  );
}
