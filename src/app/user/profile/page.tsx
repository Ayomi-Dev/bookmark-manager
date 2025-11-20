"use client"
import { Grid } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import BookmarkCard from '@/components/client/BookmarkCard';
import { useBookmarkContext } from '@/context/BookmarkContext';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { bookmarks, filteredBookmarks } = useBookmarkContext();
  const [bookmarksToDisplay, setBookmarksToDisplay ]= useState(bookmarks)

  useEffect(() => {
    setBookmarksToDisplay(filteredBookmarks.length > 0 ? filteredBookmarks : bookmarks)
  }, [filteredBookmarks, bookmarks])
        
  return (
    <PageWrapper>

      <Grid
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={3}
      >
        { 
          bookmarksToDisplay && bookmarksToDisplay?.map(bookmark => (
            <BookmarkCard bookmark={ bookmark } key={bookmark.id} />
          ))
        }
      </Grid>
    </PageWrapper>
  )
}

export default ProfilePage;