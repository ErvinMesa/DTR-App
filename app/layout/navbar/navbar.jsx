import React from "react";
import { Navbar, Grid, Center, Group } from "@mantine/core";
import NavItem from "./navItem";
import { Outlet } from "remix";

const NavbarComponent = () => {
  return (
    <>
      <Navbar height={60}>
        <Navbar.Section style={{ marginTop: "10px" }}>
          <Grid>
            <Grid.Col span={3}></Grid.Col>
            <Grid.Col span={6}>
              <Center>
                <Group>
                  <NavItem to="/dashboard">Icon</NavItem>
                  <NavItem to="/dashboard">Dashboard</NavItem>
                  <NavItem to="/DTR">DTR</NavItem>
                </Group>
              </Center>
            </Grid.Col>
            <Grid.Col span={3}></Grid.Col>
          </Grid>
        </Navbar.Section>
      </Navbar>
      <Outlet />
    </>
  );
};

export default NavbarComponent;
