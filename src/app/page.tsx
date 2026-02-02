import SignUpButton from "@/components/client/SignUpButton";
import { PageWrapper } from "@/utils/PageWrapper";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { Metadata } from "next";
import Office from "../../public/assets/file.png";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Welcome Page",
  description: "Manage all your saved bookmarks and folders in one place",
};


export default function HomePage() {
  return (
    <PageWrapper>
      <Flex
        w={"80%"}
        h={"full"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={{base: "column", md: "row"}}
        mx={"auto"}
        gap={4}
      >
        <Box
          flex={{base: "none", md:1}}
        >
          <Heading 
            fontSize={{base: "2xl", md: "5xl"}} 
            fontWeight="bold"
            mb={6}
          >
            {metadata.description}
          </Heading>
          <SignUpButton />
        </Box>
        <Box w={{base: "100%", md: "40%"}}>
          <Image src={Office} alt="office" />
        </Box>
      </Flex>
    </PageWrapper>
  );
}
