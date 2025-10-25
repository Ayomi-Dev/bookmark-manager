import { Box, Divider, Flex, Heading, IconButton, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import TagOption from './client/TagOption'
import { Bookmark } from 'iconsax-reactjs'

const SideBar = () => {
  return (
    <Box 
      h={"100vh"} 
      w={"20%"}
      bg={"brand.secBg"}
      _dark={{bg: "brand.bgDark"}}
      overflow={"auto"}
      borderRight="1px"
      borderColor="gray.200"
      p={4}
    >
      
      <VStack align="stretch" spacing={3}>
         <Text
           fontWeight="medium"
           color="gray.800"
           bg="gray.100"
           p={2}
           borderRadius="md"
         >
           Home
         </Text>
         <Text
           fontWeight="medium"
           color="gray.600"
           p={2}
           borderRadius="md"
           _hover={{ bg: "gray.100" }}
         >
           Archived
         </Text>
        </VStack>
      
        <Divider my={4} />
      <TagOption />   
    </Box>
  )
}

export default SideBar