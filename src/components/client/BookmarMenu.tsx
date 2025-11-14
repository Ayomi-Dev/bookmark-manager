"use client"

import { IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { Edit, Logout, User, UserCirlceAdd } from "iconsax-reactjs"
import { DeleteBookmarkButton } from "./DeleteBookmarkButton"
import { MoreVertical } from "./MoreVerticalIcon"


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
        <MenuItem display={"flex"} gap={2}>
            <DeleteBookmarkButton id={id} />
            <Text fontSize={"xs"}> Delete </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
