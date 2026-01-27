"use client"

import { useUserContext } from '@/context/UserContext'
import { Container } from '@chakra-ui/react'
import React, { FC, ReactNode } from 'react'

export const PageWrapper: FC<{ children: ReactNode }> = ( { children } ) => {
  const { user } = useUserContext()
  return (
    <Container
      maxWidth={"full"}
      pos={"relative"}
      ml={{base: 0, md: user ? "20%" : 0}}
      flex={1}
    >
        { children }
    </Container>
  )
}
