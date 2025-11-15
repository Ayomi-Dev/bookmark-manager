"use client"

import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { Edit } from "iconsax-reactjs"
import { MoreVertical } from "./MoreVerticalIcon"
import DeleteBookmarkButton from "./DeleteBookmarkButton"


export const BookmarkMenu = ({id}: {id: number}) => {
  return (
    <Menu>
      <MenuButton 
        as={"button"}
      >
        <MoreVertical boxSize={5} color="gray.600" cursor="pointer" /> 
      </MenuButton>
      <MenuList>
        <MenuItem display={"flex"} gap={2}>
            <Edit variant="Linear" size={15} />
            <Text fontSize={"xs"} > Edit </Text>
        </MenuItem>
        <DeleteBookmarkButton id={id} />
      </MenuList>
    </Menu>
  )
}
