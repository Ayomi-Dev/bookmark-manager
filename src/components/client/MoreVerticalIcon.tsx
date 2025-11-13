import { Icon, IconProps } from "@chakra-ui/react";

export const MoreVertical = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <circle cx="12" cy="5" r="2" fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    <circle cx="12" cy="19" r="2" fill="currentColor" />
  </Icon>
);
