import { Button, Center, Stack, Text, Paper, Loader } from "@mantine/core";
import { Link, useActionData, useLoaderData } from "remix";
import { useContext, useEffect } from "react";
import { getUserId } from "~/utils/sessions.server";
import { db } from "~/utils/db.server";
import { SessionContext } from "~/context/sessionContext";

export const loader = async ({ request }) => {
  const userId = await getUserId(request);

  if (!userId) return null;

  return db.User.findFirst({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });
};

export default function Index() {
  const data = useLoaderData();
  const [user, setUser] = useContext(SessionContext);

  useEffect(() => {
    if (data?.username) {
      setUser({ username: data.username });
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Center style={{ height: "100vh" }}>
      <Paper
        style={{ height: "50%", width: "30%" }}
        shadow="10px 10px 20px -15px #6F1A07"
        p="xl"
        radius="lg"
        withBorder
      >
        <Center style={{ height: "100%" }}>
          <div
            style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
          >
            <h1>Welcome to the DTR App</h1>
            <Center>
              <Stack spacing="xs">
                {user?.username == null ? (
                  <>
                    <Button color="blue" uppercase>
                      <Text
                        component={Link}
                        to="/login"
                        style={{ color: "white" }}
                      >
                        Login
                      </Text>
                    </Button>
                    <Button
                      variant="outline"
                      color="white"
                      size="md"
                      compact
                      uppercase
                    >
                      <Text component={Link} to="/register">
                        Register
                      </Text>
                    </Button>
                  </>
                ) : (
                  <>
                    <Text>{user.username}</Text>
                    <form action="/logout" method="post">
                      <Button
                        variant="outline"
                        color="white"
                        size="md"
                        compact
                        uppercase
                        type="submit"
                      >
                        Logout
                      </Button>
                    </form>
                  </>
                )}
              </Stack>
            </Center>
          </div>
        </Center>
      </Paper>
    </Center>
  );
}
