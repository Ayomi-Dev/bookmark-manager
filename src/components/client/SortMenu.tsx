import { Bookmark } from '@/context/BookmarkContext'
import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react'
import { Sort } from 'iconsax-reactjs'
import React, { Dispatch, FC, SetStateAction } from 'react'

interface SortProp {
    setBookmarksToDisplay:Dispatch<SetStateAction<Bookmark[]>>;
}
export const SortMenu: FC<SortProp> = ({ setBookmarksToDisplay }) => {
    const sortBookmarks = (type: string) => {
      setBookmarksToDisplay(prev => {
        const copy = [...prev];
    
        if (type === "recently added") {
          return copy.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
    
        if (type === "recently visited") {
          return copy.sort((a, b) =>
            new Date(b.lastVisited ?? 0).getTime() - new Date(a.lastVisited ?? 0).getTime()
          );
        }
    
        if (type === "most visited") {
          return copy.sort((a, b) =>
            (b.timesVisited ?? 0) - (a.timesVisited ?? 0)
          );
        }
    
        return copy;
      });
    };
  return (
    <Menu>
      <MenuButton
      >
        <Flex
          display={"flex"}
          gap={2}
          alignItems={"center"}
          fontWeight={"bold"}
          bg={"brand.secBg"}
          _dark={{bg:"brand.bgDark"}}
          borderRadius={"5px"}
          px={2} py={1}
        >
          <Sort variant='Linear' size={10} />
          <Text
            fontSize={"12px"}
          >
            Sort By 
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => sortBookmarks("recently added")}
        >
          Recently Added
        </MenuItem>
        <MenuItem
          onClick={() => sortBookmarks("recently visited")}
        >
          Recently Visited
        </MenuItem>
        <MenuItem
          onClick={() => sortBookmarks("most visited")}
        >
          Most Visited
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
