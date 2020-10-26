import React from "react";
import { Container, Input, Button, Text, Break } from "./styles/optform";

export default function OptForm({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

OptForm.Input = function optFormInput({ ...restProps }) {
  return <Input {...restProps} />;
};

OptForm.Button = function OptFormButton({ children, ...restProps }) {
  return (
    <Button {...restProps}>
      {children}
      <img src="images/icons/chevron-right.png" alt="Try Now" />
    </Button>
  );
};

OptForm.Text = function optFormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

OptForm.Break = function optFormBreak({ children, ...restProps }) {
  return <Break {...restProps}>{children}</Break>;
};
