import { useBookmarkContext } from '@/context/BookmarkContext'
import { Container } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

export const PageWrapper: FC<{ children: ReactNode }> = ( { children } ) => {
  return (
    <Container
      maxWidth={"full"}
      pos={"relative"}
    >
        { children }
    </Container>
  )
}
