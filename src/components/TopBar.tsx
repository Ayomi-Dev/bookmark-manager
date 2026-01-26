"use client"

import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { SearchBar } from './client/SearchBar';
import { AddBookmarkButon } from './client/AddBookmarkButon';
import { UserMenu } from './client/UserMenu';
import ThemeToggleButton from './client/ThemeToggleButton';
import { Bookmark } from 'iconsax-reactjs';
import { useBookmarkContext } from '@/context/BookmarkContext';

const TopBar = () => {
  const { toggleSideBar } = useBookmarkContext()
  return (
    <Flex 
      h={"70px"} 
      w={"100%"}
       bg={"brand.secBg"}
      _dark={{bg: "brand.bgDark"}}
      position={"sticky"}
      top={0}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={2}
      zIndex={99}
    >
      <Flex
        alignItems={"center"}
        gap={2}
        px={3}
        w={"50%"}
      >
        
        <HStack w={"40%"}>
          <IconButton aria-label='bookmark'
            icon={<Bookmark size={15} variant='Linear' />}
            size={"sm"}
            bg={"teal.700"}
            onClick={toggleSideBar}
          />
          <Text
            fontWeight={"bold"}
            fontSize={"md"}
            hideBelow={"md"}
          >
            Bookmark Manager
          </Text>
        </HStack>

        {/* search bar component */}
        <SearchBar />

      </Flex>
      <Box
        display={"flex"}
        gap={1}
        alignItems={"center"}
        px={2}
      >
        <AddBookmarkButon />
        <UserMenu />
        <ThemeToggleButton />
      </Box>
    </Flex>
  )
}

export default TopBar;