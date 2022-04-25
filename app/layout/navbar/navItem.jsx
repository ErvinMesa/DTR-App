import React from "react";
import { Link } from "remix";
import { Grid, Anchor, Button } from "@mantine/core";

const NavItem = ({ children, to }) => {
  return (
    <Button
      component={Link}
      variant="filled"
      color="red"
      radius="xl"
      style={{ width: "120px" }}
      to={to}
    >
      {children}
    </Button>
  );
};

export default NavItem;
