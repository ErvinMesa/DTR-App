import { useLoaderData } from "remix";
import { Center, Text, Table, Container } from "@mantine/core";
import { db } from "~/utils/db.server";
import { useEffect } from "react";

export async function loader() {
  users = await db.User.findMany();
  return { users };
}

export default function ListUsers() {
  const { users } = useLoaderData();

  useEffect(() => {
    console.log(users);
  }, []);

  const HeadText = ({ children }) => {
    return (
      <Text component="td" align="center">
        {children}
      </Text>
    );
  };

  const usersTableHead = () => {
    return (
      <tr>
        <HeadText>ID</HeadText>
        <HeadText>Username</HeadText>
        <HeadText>Created At</HeadText>
      </tr>
    );
  };

  const RowText = ({ children }) => {
    return (
      <Text component="td" align="center">
        {children}
      </Text>
    );
  };

  const getUsers = () => {
    return users.map(({ username, createdAt, id }) => (
      <>
        <tr>
          <RowText component="td">{id}</RowText>
          <RowText component="td">{username}</RowText>
          <RowText component="td">{createdAt}</RowText>
        </tr>
      </>
    ));
  };

  return (
    <Center style={{ height: "100vh" }}>
      <Container style={{ width: "80vw" }}>
        <Table verticalSpacing="sm" striped>
          <thead>{usersTableHead()}</thead>
          <tbody>{users && getUsers()}</tbody>
          <tfoot>{usersTableHead()}</tfoot>
        </Table>
      </Container>
    </Center>
  );
}
