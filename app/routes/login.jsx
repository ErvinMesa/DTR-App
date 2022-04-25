import { Form, useActionData } from "remix";
import {
  Center,
  Paper,
  PasswordInput,
  Input,
  Title,
  Stack,
  Button,
} from "@mantine/core";
import { json } from "@remix-run/node";
import { createUserSession, login } from "~/utils/sessions.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");
  const user = await login({ username, password });
  if (!user) {
    return json({ formError: `Invalid Credentials` });
  }
  return createUserSession(user.id, "/dashboard");
};

export default function LoginUser() {
  const actionData = useActionData();
  return (
    <Center style={{ height: "100vh" }}>
      <Paper
        style={{ height: "30%", width: "20%" }}
        shadow="10px 10px 20px -15px #6F1A07"
        p="xl"
        radius="lg"
        withBorder
      >
        <Stack spacing="md">
          <Title order={2}>Login</Title>
          <Form method="post">
            <Center>
              <Stack spacing="md" style={{ width: "50%", paddingTop: "15px" }}>
                <Input placeholder="username" name="username" />
                <PasswordInput placeholder="password" name="password" />
                <Button type="submit">Login</Button>
                {actionData?.formError && actionData.formError}
              </Stack>
            </Center>
          </Form>
        </Stack>
      </Paper>
    </Center>
  );
}
