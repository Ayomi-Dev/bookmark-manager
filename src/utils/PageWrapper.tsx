import { useBookmarkContext } from '@/context/BookmarkContext'
import { Container } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

export const PageWrapper: FC<{ children: ReactNode }> = ( { children } ) => {
  return (
    <Container
      minHeight={'100vh'}
      flex={1}
      p={3}
      m={0}
      maxWidth={"full"}
      pos={"relative"}
    >
        { children }
    </Container>
  )
}
