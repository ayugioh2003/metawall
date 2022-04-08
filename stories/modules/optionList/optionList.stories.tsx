import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import avatar from "../../../public/image/user.png";

import { OptionList } from "./OptionList";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Component/OptionList",
  component: OptionList,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof OptionList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OptionList> = args => (
  <OptionList {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  options: [{ name: "邊緣小杰", icon: avatar }],
};
