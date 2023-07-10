import { useForm } from "@mantine/form";
import { AuthState, User, setCredentials } from "../features/authSlice";
import { useState } from "react";
import {
  Box,
  Anchor,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useDispatch } from "react-redux";

type LoginData = Omit<User, "fullName">;

const initialLoginFormValue: LoginData = {
  email: "",
  password: "",
};

const initialRegisterFormValue: User = {
  fullName: "",
  email: "",
  password: "",
};

export default function AuthForm({onClose} : {onClose: () => void}) {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: isLoginForm
      ? initialLoginFormValue
      : initialRegisterFormValue,
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 2
          ? "Password must be greater than 2 characters long"
          : null,
    },
  });

  function handleSubmit(values: User | LoginData) {
    setIsLoading(true);
    if (isLoginForm) login(values);
    else register(values as User);
  }

  async function login(data: LoginData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const authData: AuthState = await response.json(); 
      if (authData) {
        dispatch(setCredentials(authData));
        form.reset();
        onClose();
      }
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function register(data: User) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      form.reset();
      setIsLoginForm(true);
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {!isLoginForm && (
          <TextInput
            withAsterisk
            label="Full Name"
            placeholder="Full Name"
            {...form.getInputProps("fullName")}
          />
        )}
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Password"
          label="Password"
          description="Password must be atleast 2 characters long"
          {...form.getInputProps("password")}
          withAsterisk
        />
        <Text size={"sm"}>
          {isLoginForm
            ? "Don't have an account? "
            : "Already have an account? "}
          <Anchor
            component="button"
            type="button"
            onClick={() => setIsLoginForm(!isLoginForm)}
          >
            {isLoginForm ? "Register" : "Login"}
          </Anchor>
        </Text>

        <Group position="right" mt="md">
          <Button type="submit" loading={isLoading}>Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
