"use client"
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import BookmarkCard from '@/components/client/BookmarkCard';
import { useBookmarkContext } from '@/context/BookmarkContext';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AddBookmarkButon } from '@/components/client/AddBookmarkButon';
import { SortMenu } from '@/components/client/SortMenu';
import { useUserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

const MotionGridItem = motion.create(Box) //wrapsbookmark card in an animation box

const ProfilePage = () => {
  const { user } = useUserContext()
  const router = useRouter()
  const { bookmarks, filteredBookmarks } = useBookmarkContext();
  const [bookmarksToDisplay, setBookmarksToDisplay ]= useState(bookmarks)

  useEffect(() => {
    setBookmarksToDisplay(filteredBookmarks?.length > 0 ? filteredBookmarks : bookmarks)
  }, [filteredBookmarks, bookmarks])

  // if(!user){
  //   router.push('/login');
  //   return
  // }

  return (
    <PageWrapper>
      <Box
        w={"full"}
        h={"100%"}
      >
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