"use client"
import { Grid } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import BookmarkCard from '@/components/client/BookmarkCard';
import { useBookmarkContext } from '@/context/BookmarkContext';

const ProfilePage = () => {
     const { bookmarks } = useBookmarkContext();
        
  return (
    <PageWrapper>

      <Grid
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={3}
      >
        { 
          bookmarks && bookmarks.map(bookmark => (
            <BookmarkCard bookmark={ bookmark } key={bookmark.id} />
          ))
        }
      </Grid>
    </PageWrapper>
  )
}

export default ProfilePage;