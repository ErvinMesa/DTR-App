import { Form } from "remix";
import {
  Center,
  Paper,
  PasswordInput,
  Input,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import { register } from "~/utils/sessions.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  await register({ username, password });

  return `form contents: ${username} and ${password}`;
};

export default function RegisterUser() {
  return (
    <Center style={{ height: "100vh" }}>
      <Paper
        style={{ height: "30%", width: "30%" }}
        shadow="sm"
        p="xl"
        withBorder
      >
        <Stack spacing="md">
          <Title order={2}>Registration</Title>
          <Form method="post">
            <Center>
              <Stack spacing="md" style={{ width: "50%", paddingTop: "15px" }}>
                <Input placeholder="username" name="username" />
                <PasswordInput placeholder="password" name="password" />
                <Button type="submit">Register</Button>
              </Stack>
            </Center>
          </Form>
        </Stack>
      </Paper>
    </Center>
  );
}
