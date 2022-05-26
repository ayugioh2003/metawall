import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import avatar from "../../../public/image/user.png";
import { User } from "./User";
import dayjs from "dayjs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/User",
  component: User,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof User>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof User> = args => <User {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  avatar,
  width: "50px",
  height: "50px",
};

export const BottomLine = Template.bind({});
BottomLine.args = {
  avatar,
  bottomLine: true,
};

export const Date = Template.bind({});
Date.args = {
  avatar,
  width: "45px",
  height: "45px",
  date: dayjs().format("YYYY/MM/DD HH:mm"),
};
