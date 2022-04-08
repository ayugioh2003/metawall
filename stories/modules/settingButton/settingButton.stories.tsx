import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SettingButton } from "./SettingButton";
import { BellOutlined, LikeOutlined } from "@ant-design/icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/SettingButton",
  component: SettingButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SettingButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SettingButton> = args => (
  <SettingButton {...args} />
);

export const Follow = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Follow.args = {
  text: "追蹤名單",
  icon: <BellOutlined className="text-xl flex justify-center items-center" />,
};

export const Like = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Like.args = {
  text: "我按讚的文章",
  icon: <LikeOutlined className="text-xl flex justify-center items-center" />,
};
