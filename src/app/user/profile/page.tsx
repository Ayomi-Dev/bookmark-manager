"use client"
import { Box, Button, Grid } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import { useUserContext } from '@/context/UserContext';
import BookmarkCard from '@/components/client/BookmarkCard';

const ProfilePage = () => {
     const { user } = useUserContext()  
     const bookmarks = user?.bookmarks.map(bookmark => {
        return {
          ...bookmark,
          tags: typeof bookmark.tags === 'string' ? JSON.parse(bookmark.tags) : bookmark.tags
        }
      })      
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