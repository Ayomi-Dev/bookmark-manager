import { FormControl, Input, FormLabel, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

interface FloatingInputProps {
  name: string;
  type?: string;
  label: string;
  [key: string]: unknown;
}

export const InputComponent: React.FC<FloatingInputProps> = ({
  name,
  type = "text",
  label,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Theme-aware colors
  const borderColor = useColorModeValue("blue.200", "gray.200");
  const focusBorderColor = useColorModeValue("blue.300", "gray.400");
  const labelColor = useColorModeValue("gray.500", "gray.400");
  const activeLabelColor = useColorModeValue("blue.400", "black");
  const textColor = useColorModeValue("brand.textLight", "black");
  const bg = useColorModeValue("transparent", "transparent");

  return (
    <FormControl position="relative" my={3} w="full">
      <Input
        name={name}
        type={type}
        variant="flushed"
        borderColor={borderColor}
        focusBorderColor={focusBorderColor}
        color={textColor}
        fontSize="sm"
        p={2}
        bg={bg}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
        }}
        {...props}
      />

      <FormLabel
        htmlFor={name}
        position="absolute"
        left="8px"
        top={isFocused || hasValue ? "-6px" : "8px"}
        fontSize={isFocused || hasValue ? "xs" : "sm"}
        color={isFocused || hasValue ? activeLabelColor : labelColor}
        transition="all 0.2s ease"
        pointerEvents="none"
      >
        {label}
      </FormLabel>
    </FormControl>
  );
};
