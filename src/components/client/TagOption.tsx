"use client";
import { useBookmarkContext } from "@/context/BookmarkContext";
import { Tags } from "@/types";
import { Box, Checkbox, Flex, Heading, Text, VStack } from "@chakra-ui/react";
const TagOption = () => {
  const { addFilterTag, filterTags, removeFilterTag, getCountOfTag } = useBookmarkContext();

  const handleTagToggle = (tag: string, isChecked: boolean) => {
    if(isChecked){
      addFilterTag(tag); 
    }
    else{
      removeFilterTag(tag)
    }

  }
  return (
    <Box
      w="full"
    >
      

      <Box>
        <Heading
          as="h3"
          fontSize="sm"
          fontWeight="semibold"
          color="gray.500"
          mb={2}
        >
          TAGS
        </Heading>

        <VStack align="stretch" spacing={2}>
          {Tags.map((tag, index) => (
            <Flex
              key={index}
              align="center"
              justify="space-between"
              _hover={{ bg: "gray.100", color: "black", fontWeight: "bold" }}
              px={2}
              py={1}
              borderRadius="md"
            >
              <Checkbox 
                colorScheme="teal" 
                size="sm" 
                isChecked={filterTags.includes(tag)}
                onChange={(e) =>handleTagToggle(tag, e.target.checked)}
              >
                <Text fontSize="sm">{tag}</Text>
              </Checkbox>
              <Text 
                fontSize="xs" 
                color="gray.500" 
                bg={"brand.bgLight"}
                px={2} py={1}
                borderRadius={"50%"}
              >
                { getCountOfTag(tag) }
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}

export default TagOption