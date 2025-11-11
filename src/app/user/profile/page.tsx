"use client"
import { Box, Button } from '@chakra-ui/react';
import { PageWrapper } from '@/utils/PageWrapper';
import { useUserContext } from '@/context/UserContext';

const ProfilePage = () => {
     const { user } = useUserContext()  
      
  return (
    <PageWrapper>

      <Box>
        { user?.name}
      </Box>
    </PageWrapper>
  )
}

export default ProfilePage;