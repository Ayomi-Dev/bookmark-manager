"use client"

import React from 'react'
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import { useBookmarkContext } from '@/context/BookmarkContext'
import { useUserContext } from '@/context/UserContext'
import { Add } from 'iconsax-reactjs'

export const AddBookmarkButon = () => {
  const { onOpen } =useBookmarkContext( )
 
  return (
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
