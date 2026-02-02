"use client"

import React from 'react'
import { Box, Button, Text} from '@chakra-ui/react'
import { useBookmarkContext } from '@/context/BookmarkContext'
import { Add } from 'iconsax-reactjs'
import { useUserContext } from '@/context/UserContext'

export const AddBookmarkButon = () => {
  const { onOpen } =useBookmarkContext( )
  const { user } = useUserContext()
 
  return (
    user && 
    <Button
     onClick={onOpen}
    >
      <Text hideBelow={"md"}>Add Bookmark</Text>
      <Box hideFrom={"md"}>
        <Add variant='Linear' size={15} />
      </Box>
    </Button>
)
}
