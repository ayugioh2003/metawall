import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DonateButton } from "./DonateButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Modules/DonateButton",
  component: DonateButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof DonateButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DonateButton> = args => <DonateButton {...args} />;

export const Donate = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Donate.args = {};