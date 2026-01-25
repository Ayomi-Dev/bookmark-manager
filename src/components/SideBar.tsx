"use client"

import { Box, Divider, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import TagOption from './client/TagOption'
import Link from 'next/link'
import { useBookmarkContext } from '@/context/BookmarkContext'
import { useUserContext } from '@/context/UserContext'

const SideBar = () => {
  const { archivedBookmarks } = useBookmarkContext();
  const { user } = useUserContext()
  return (
    <>
      {
        user && (
          <Box 
            h={"100vh"} 
            w={"20%"}
            bg={"brand.secBg"}
            _dark={{bg: "brand.bgDark"}}
            overflow={"auto"}
            borderRight="1px"
            borderColor="gray.200"
            p={4}
            position={"sticky"}
            top={0}
          >
            
            <VStack align="stretch" spacing={3}>
              <Link href={'/user/profile'}>
                <Text
                  fontWeight="medium"
                  _hover={{ bg: "gray.100", color: "black", fontWeight: "bold" }}
                  p={2}
                  borderRadius="md"
                >
                  Home
                </Text>
              </Link>
              <Link href={`/user/archived/bookmarks`}>
                <Text
                  fontWeight="medium"
                  p={2}
                  borderRadius="md"
                  _hover={{ bg: "gray.100", color: "black", fontWeight: "bold" }}
                >
                  Archived ({ archivedBookmarks.length})
                </Text>
              </Link>
            </VStack>
            
            <Divider my={4} />
            <TagOption />   
          </Box>

        )
      }
    </>
  )
}

export default SideBar