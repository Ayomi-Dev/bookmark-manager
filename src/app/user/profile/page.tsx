"use client"
import { Box, Flex, Grid, Heading, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import BookmarkCard from '@/components/client/BookmarkCard';
import { useBookmarkContext } from '@/context/BookmarkContext';
import { useEffect, useState } from 'react';
import { Sort } from 'iconsax-reactjs';
import { motion, AnimatePresence } from 'framer-motion';

const MotionGridItem = motion.create(Box)

const ProfilePage = () => {
  const { bookmarks, filteredBookmarks } = useBookmarkContext();
  const [bookmarksToDisplay, setBookmarksToDisplay ]= useState(bookmarks)

  useEffect(() => {
    setBookmarksToDisplay(filteredBookmarks?.length > 0 ? filteredBookmarks : bookmarks)
  }, [filteredBookmarks, bookmarks])

  
  // sort control
const sortBookmarks = (type: string) => {
  setBookmarksToDisplay(prev => {
    const copy = [...prev];

    if (type === "recently added") {
      return copy.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    if (type === "recently visited") {
      return copy.sort((a, b) =>
        new Date(b.lastVisited ?? 0).getTime() - new Date(a.lastVisited ?? 0).getTime()
      );
    }

    if (type === "most visited") {
      return copy.sort((a, b) =>
        (b.timesVisited ?? 0) - (a.timesVisited ?? 0)
      );
    }

    return copy;
  });
};



  return (
    <PageWrapper>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        py={3}
      >
        <Heading
          fontSize={"16px"}
        >
          All Bookmarks
        </Heading>
        <Menu>
          <MenuButton
          >
            <Flex
              display={"flex"}
              gap={2}
              alignItems={"center"}
              fontWeight={"bold"}
              bg={"brand.secBg"}
              _dark={{bg:"brand.bgDark"}}
              borderRadius={"5px"}
              px={2} py={1}
            >
              <Sort variant='Linear' size={10} />
              <Text
                fontSize={"12px"}
              >
                Sort By 
              </Text>

            </Flex>
          </MenuButton>

          <MenuList>
            <MenuItem
              onClick={() => sortBookmarks("recently added")}
            >
              Recently Added
            </MenuItem>
            <MenuItem
              onClick={() => sortBookmarks("recently visited")}
            >
              Recently Visited
            </MenuItem>
            <MenuItem
              onClick={() => sortBookmarks("most visited")}
            >
              Most Visited
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Grid
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={3}
      >
        <AnimatePresence>  
        { 
          bookmarksToDisplay && bookmarksToDisplay?.map(bookmark => (
            <MotionGridItem
              key={bookmark.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <BookmarkCard bookmark={bookmark} />
            </MotionGridItem>
          ))
        }
        </AnimatePresence>
      </Grid>
    </PageWrapper>
  )
}

export default ProfilePage;