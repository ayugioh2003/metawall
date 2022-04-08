import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FollowButton } from "./FollowButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Modules/FollowButton",
  component: FollowButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FollowButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FollowButton> = args => (
  <FollowButton {...args} />
);

export const Follow = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Follow.args = {
  type: "follow",
};

export const UnFollow = Template.bind({});
UnFollow.args = {
  type: "unfollow",
};
