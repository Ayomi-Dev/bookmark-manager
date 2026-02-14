"use client"
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import BookmarkCard from '@/components/client/BookmarkCard';
import { useBookmarkContext } from '@/context/BookmarkContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddBookmarkButon } from '@/components/client/AddBookmarkButon';
import { SortMenu } from '@/components/client/SortMenu';


const MotionGridItem = motion.create(Box) //wraps bookmark card in an animation box

const ProfilePage = () => {
  const { bookmarks, filteredBookmarks } = useBookmarkContext();
  const [bookmarksToDisplay, setBookmarksToDisplay ]= useState(bookmarks)

  useEffect(() => {
    setBookmarksToDisplay(filteredBookmarks?.length > 0 ? filteredBookmarks : bookmarks)
  }, [filteredBookmarks, bookmarks])


  return (
    <PageWrapper>
      <Box
        w={"full"}
        h={"100%"}
        pos={"relative"}
      >
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          py={3}
          pos={"sticky"}
          top={70}
          left={0}
          zIndex={50}
          bg={"brand"}
        >
          <Heading
            fontSize={"16px"}
            bg={"black"}
            color={"white"}
            px={2}
            py={1}
            borderRadius={"md"}
          >
            All Bookmarks
          </Heading>

          {/* Sort menu options */}
          <SortMenu setBookmarksToDisplay = { setBookmarksToDisplay }  />

        </Flex>

        {!bookmarksToDisplay || bookmarksToDisplay.length === 0 && (
          <Box
            textAlign={"center"}
            py={10}
          >
            <Text fontWeight={"extrabold"} fontSize={"x-large"}>You have no Bookmarks yet</Text>
            <AddBookmarkButon />
          </Box>
        )}

        {/* Bookmark cards container */}
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

      </Box>
    </PageWrapper>
  )
}

export default ProfilePage;