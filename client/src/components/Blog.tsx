import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Menu,
  Paper,
  Spoiler,
  Text,
} from "@mantine/core";
import { Blog as BlogType } from "../features/blogSlice";
import { timeAgo } from "../utils/timeAgo";
import { IconArrowsLeftRight, IconDots, IconTrash } from "@tabler/icons-react";

type PropType = {
  blog: BlogType;
};
export default function Blog({ blog }: PropType) {
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

            <Menu.Item color="red" icon={<IconTrash size={14} />}>
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
