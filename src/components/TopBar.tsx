"use client"

import { Box, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { SearchBar } from './client/SearchBar';
import { AddBookmarkButon } from './client/AddBookmarkButon';
import { UserMenu } from './client/UserMenu';
import ThemeToggleButton from './client/ThemeToggleButton';
import { Bookmark } from 'iconsax-reactjs';
import { useBookmarkContext } from '@/context/BookmarkContext';
import Link from 'next/link';
import LoginButton from './client/LoginButton';

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
      justifyContent={{base: "", md: "space-between"}}
      px={3}
      zIndex={99}
    >
      <Flex
        alignItems={"center"}
        gap={2}
        w={"70%"}
      >
        
        <Flex  gap={2}> 
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
            <Link href={`/`}>
              Bookmark Manager
            </Link>
          </Text>
        </Flex>

        <SearchBar />

      </Flex>
      <Box
        display={"flex"}
        gap={1}
        alignItems={"center"}
        px={2}
      >
        <LoginButton />
        <AddBookmarkButon />
        <UserMenu />
        <ThemeToggleButton />
      </Box>
    </Flex>
  )
}

export default TopBar;