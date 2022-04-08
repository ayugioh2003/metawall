import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { FollowTitle } from "./FollowTitle";
import user5 from "../../../public/image/user5-1.png";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Modules/FollowTitle",
  component: FollowTitle,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof FollowTitle>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FollowTitle> = args => (
  <FollowTitle {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  src: user5,
  followName: "阿爾敏",
  followQuantity: "987,987",
};
