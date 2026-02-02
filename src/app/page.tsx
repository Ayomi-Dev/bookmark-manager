import { PageWrapper } from "@/utils/PageWrapper";
import { Flex, Heading, Text } from "@chakra-ui/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome Page",
  description: "Manage all your saved bookmarks and folders in one place",
};


export default function HomePage() {
  return (
    <PageWrapper>
      <Flex
        w={"full"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Heading fontSize="4xl" fontWeight="bold">
          {metadata.description}
        </Heading>
      </Flex>
    </PageWrapper>
  );
}
