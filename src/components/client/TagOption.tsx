"use client";
import { useBookmarkContext } from "@/context/BookmarkContext";
import { Tags } from "@/types";
import { Box, Checkbox, Flex, Heading, Text, VStack } from "@chakra-ui/react";
const TagOption = () => {
  const { addTags, tags, removeTags } = useBookmarkContext();

  const handleTagToggle = (tag: string, isChecked: boolean) => {
    if(isChecked){
      addTags(tag); 

    }
    else{
      removeTags(tag)
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
              _hover={{ bg: "gray.100" }}
              px={2}
              py={1}
              borderRadius="md"
            >
              <Checkbox 
                colorScheme="teal" 
                size="sm" 
                isChecked={tags.includes(tag)}
                onChange={(e) =>handleTagToggle(tag, e.target.checked)}>
                <Text fontSize="sm">{tag}</Text>
              </Checkbox>
              <Text fontSize="xs" color="gray.500">
                1
              </Text>
            </Flex>
          ))}
        </VStack>
      </Box>
    </Box>
  )
}

export default TagOption