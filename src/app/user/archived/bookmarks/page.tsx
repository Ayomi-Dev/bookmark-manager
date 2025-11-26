"use client"

import BookmarkCard from '@/components/client/BookmarkCard'
import { useBookmarkContext } from '@/context/BookmarkContext'
import { PageWrapper } from '@/utils/PageWrapper'
import { Grid } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'


const MotionGridItem = motion.create(Grid)

const ArchivedBookmarks = () => {
    const { archivedBookmarks } = useBookmarkContext()
  return (
    <PageWrapper>
        <Grid
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={3}
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
    </PageWrapper>
  )
}

export default ArchivedBookmarks