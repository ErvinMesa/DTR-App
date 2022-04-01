import { Button, Center, Stack, Text, Paper } from "@mantine/core";
import { Link } from "remix";

export default function Index() {
  return (
    <Center style={{ height: "100vh" }}>
      <Paper
        style={{ height: "50%", width: "30%" }}
        shadow="sm"
        p="xl"
        withBorder
      >
        <Center style={{ height: "100%" }}>
          <div
            style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}
          >
            <h1>Welcome to the DTR App</h1>
            <Center>
              <Stack spacing="xs">
                <Button color="blue" uppercase>
                  <Text component={Link} to="/login" style={{ color: "white" }}>
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
              </Stack>
            </Center>
          </div>
        </Center>
      </Paper>
    </Center>
  );
}
