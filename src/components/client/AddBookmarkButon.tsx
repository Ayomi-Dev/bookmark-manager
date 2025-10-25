"use client"

import React from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import { useBookmarkContext } from '@/context/BookmarkContext'

export const AddBookmarkButon = () => {
  const { onOpen, isOpen } =useBookmarkContext( )
 
  return (
    <Button
     onClick={onOpen}
    > 
        Add Boomark
    </Button>
)
}
