import { RadioGroup, Radio, Text, Group, Center } from "@mantine/core";
import { createStyles } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  brandRadioGroup: {
    ".mantine-RadioGroup-radioWrapper": {
      "& .mantine-RadioGroup-inner input": {
        appearance: "none",
        backgroundColor: "#fff",
        margin: 0,
        color: "black",
        width: "1.15em",
        height: "1.15em",
        border: "0.15em solid green",
        borderRadius: "50%",
        display: "grid",
        placeContent: "center",
      },
      "& .mantine-RadioGroup-inner input::before": {
        content: `""`,
        width: "0.65em",
        height: "0.65em",
        borderRadius: "50%",
        transform: "scale(0)",
      },
      " .mantine-RadioGroup-inner input:checked::before": {
        transform: "scale(1)",
      },
    },
  },
}));

const test = () => {
  const { classes } = useStyles();
  const [value, setValue] = useState("react");

  return (
    <Center>
      <RadioGroup
        value={value}
        onChange={setValue}
        orientation="vertical"
        required
        className={classes.brandRadioGroup}
      >
        <Radio value="react" label="React" />
        <Radio value="svelte" label="Svelte" />
        <Radio value="ng" label="Angular" />
        <Radio value="vue" label="Vue" />
      </RadioGroup>
    </Center>
  );
};

export default test;
