import { PageWrapper } from "@/utils/PageWrapper";
import { Box, Button, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <PageWrapper>
      <Box  w={"full"}>
        <Text fontSize="2xl" fontWeight="bold">
          Welcome to My App
        </Text>
      </Box>
    </PageWrapper>
  );
}
