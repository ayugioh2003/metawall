import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { LikeButton } from "./LikeButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Modules/LikeButton",
  component: LikeButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof LikeButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LikeButton> = args => <LikeButton {...args} />;

export const Like = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Like.args = {};

export const UnLike = Template.bind({});
UnLike.args = {};