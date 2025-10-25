import ThemeToggleButton from "@/components/client/ThemeToggleButton";
import { Box, Button, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box minH="100vh" p={6}  w={"full"}>
      <Text fontSize="2xl" fontWeight="bold">
        Welcome to My App
      </Text>
    </Box>
  );
}
