import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import bg from "../../../public/image/image.png";
import avatar from "../../../public/image/user.png";

import { Post } from "./Post";
import dayjs from "dayjs";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/Post",
  component: Post,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Post>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Post> = args => <Post {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  user: {
    name: "邊緣小杰",
    avatar,
  },
  content: "外面看起來就超冷.... 我決定回被窩繼續睡....>.<",
  image: bg,
  createdAt: dayjs().format("YYYY/MM/DD HH:mm"),
};
