"use client"

import React from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useBookmarkContext } from '@/context/BookmarkContext'
import { useUserContext } from '@/context/UserContext'

export const AddBookmarkButon = () => {
  const { onOpen } =useBookmarkContext( )
 
  return (
    <Button
     onClick={onOpen}
    > 
        Add Boomark
    </Button>
)
}
