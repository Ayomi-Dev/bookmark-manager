"use client"
import { Box, Button } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import { useUserContext } from '@/context/UserContext';

const ProfilePage = () => {
     const { user } = useUserContext()  
     console.log( user?.bookmarks)
      
  return (
    <PageWrapper>

      <Box>
        { user?.name}
        { user?.bookmarks}
      </Box>
    </PageWrapper>
  )
}

export default ProfilePage;