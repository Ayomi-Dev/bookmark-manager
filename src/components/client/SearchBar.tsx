"use client"

import { Box, Flex, Input } from '@chakra-ui/react'
import { SearchNormal } from 'iconsax-reactjs'
import React from 'react'

export const SearchBar = () => {
  return (
    <Flex
        w={"200px"}
        border={"1px solid #e1e1e2"}
        borderRadius={"10px"}
        alignItems={"center"}
        gap={2}
        px={2}
    >
        <SearchNormal variant='Linear' size={15} />
        <Input 
            placeholder='Search bookmarks'
            fontSize={"1rem"}
            color={"brand.textLight"}
         />
    </Flex>
  )
}
