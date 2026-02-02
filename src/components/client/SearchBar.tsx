"use client"

import { useBookmarkContext } from '@/context/BookmarkContext'
import { Flex, Input } from '@chakra-ui/react'
import { SearchNormal } from 'iconsax-reactjs'
import React, { ChangeEvent, useState } from 'react'

export const SearchBar = () => {
  const { searchBookmarks } = useBookmarkContext();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    searchBookmarks(e.target.value)
  }
  return (
    <Flex
        w={{base: "150px", sm:"500px"}}
        border={"1px solid #e1e1e2"}
        borderRadius={"10px"}
        alignItems={"center"}
        gap={2}
        px={{base: 1, md:2}}
    >
        <SearchNormal variant='Linear' size={15} />
        <Input 
            placeholder='Search bookmarks'
            fontSize={"1rem"}
            color={"brand.textLight"}
            border={"none"}
            variant="unstyled"
            _placeholder={{ fontSize: "14px"}}
            py={1}
            value={searchQuery}
            onChange={handleSearch}
         />
    </Flex>
  )
}
