"use client"

import BookmarkCard from '@/components/client/BookmarkCard'
import { useBookmarkContext } from '@/context/BookmarkContext'
import { PageWrapper } from '@/utils/PageWrapper'
import {Box, Flex, Grid, Heading } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'


const MotionGridItem = motion.create(Grid)

const ArchivedBookmarks = () => {
    const { archivedBookmarks } = useBookmarkContext()
  return (
    <PageWrapper>
      <Box
        w={"100%"}
        h={"100%"}
      >
        {archivedBookmarks?.length === 0 ? (
          <Flex  
            justifyContent={"center"} 
            alignItems={"center"} 
            w={"100%"} 
            h={"100%"}
          >
            <Heading as={"h1"} size={"lg"} >
              No archived bookmarks
            </Heading>
          </Flex>
        ) : (

          <Grid
            templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
            gap={3}
            border={"2px solid red"}
            w={"100%"}
            h={"100%"}
          >
            <AnimatePresence>  
            { 
              archivedBookmarks && archivedBookmarks?.map(bookmark => (
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
        )
        }

      </Box>
    </PageWrapper>
  )
}

export default ArchivedBookmarks