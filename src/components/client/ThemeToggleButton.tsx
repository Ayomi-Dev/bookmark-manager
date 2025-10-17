// components/ThemeToggleButton.tsx
"use client";

import { IconButton, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "iconsax-reactjs";
;

export default function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle theme"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <Moon /> : <Sun />}
      variant="ghost"
    />
  );
}
