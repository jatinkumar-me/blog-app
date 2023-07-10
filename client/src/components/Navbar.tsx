import {
  Header,
  Group,
  Button,
  Title,
  ActionIcon,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconMoonStars,
  IconSun,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/authSlice";
import { modals } from "@mantine/modals";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isDark = colorScheme === "dark";

  function handleClick() {
    if (!user) {
      modals.openContextModal({
        modal: "authorization",
        title: "Authentication",
        innerProps: {},
      });
      return;
    }
    dispatch(logout());
  }

  return (
    <Header height={60} px="md" mb={30}>
      <Group position="apart" sx={{ height: "100%" }}>
        <Group sx={{ height: "100%" }}>
          <Title size={"h3"}>Blog app</Title>
          <ActionIcon
            aria-label="github"
            component="a"
            href="https://github.com/jatinkumar-me/blog-app"
            target="_blank"
          >
            <IconBrandGithubFilled />
          </ActionIcon>
          <ActionIcon onClick={() => toggleColorScheme()}>
            {isDark ? <IconSun /> : <IconMoonStars />}
          </ActionIcon>
        </Group>

        <Group>
          {user && <Text>{user.fullName}</Text>}
          <Button
            variant="default"
            aria-label={user ? "log out" : "log in"}
            onClick={handleClick}
          >
            {user ? "Log out" : "Log in"}
          </Button>
        </Group>
      </Group>
    </Header>
  );
}
