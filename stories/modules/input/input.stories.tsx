import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Input } from "./Input";

export default {
  title: "Modules/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = args => {
  const [value, setValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return <Input {...args} value={value} onChange={onChange} />;
};

export const EmailTemplate = Template.bind({});
EmailTemplate.args = {
  placeholder: "Email",
};
