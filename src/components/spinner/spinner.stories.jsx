import React from "react";
import Spinner from "./spinner-component";

export default {
  title: "Spinner",
  component: Spinner,
};

const Template = (args) => <Spinner {...args} />;

export const Story = Template.bind({});

Story.args = {
  display: true,
  spinnerWithOverlay: true,
  floating: true,
  initialLoading: true,
};