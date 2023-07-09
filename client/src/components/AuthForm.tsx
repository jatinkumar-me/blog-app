import { useForm } from "@mantine/form";
import { User } from "../features/authSlice";
import { useState } from "react";
import {
  Box,
  Anchor,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";

const initialLoginFormValue: Omit<User, "fullName"> = {
  email: "",
  password: "",
};

const initialRegisterFormValue: User = {
  fullName: "",
  email: "",
  password: "",
};

export default function AuthForm() {
  const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

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

  function handleSubmit(values: User | typeof initialLoginFormValue) {
    console.log(values);
    form.reset();    
  }

  return (
    <Box maw={300} mx="auto">
      <Text>Authentication</Text>
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
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
