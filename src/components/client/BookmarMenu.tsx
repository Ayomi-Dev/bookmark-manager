"use client"

import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { Archive, Edit } from "iconsax-reactjs"
import { MoreVertical } from "./MoreVerticalIcon"
import DeleteBookmarkButton from "./DeleteBookmarkButton"
import Link from "next/link"


export const BookmarkMenu = ({id}: {id: number}) => {
  return (
    <Menu>
      <MenuButton 
        as={"button"}
      >
        <MoreVertical boxSize={5} color="gray.600" cursor="pointer" /> 
      </MenuButton>
      <MenuList>
        <MenuItem >
        <Link 
          href={`/bookmark/edit/${id}`} 
          style={{display: "flex", gap: "8px"}}
        >
            <Edit variant="Linear" size={15} />
            <Text fontSize={"xs"} > Edit </Text>
        </Link>
        </MenuItem>
        <MenuItem 
         display={"flex"}
         gap={2}
         >
            <Archive variant="Linear" size={15} />
            <Text fontSize={"xs"} > Archive </Text>
        </MenuItem>
        <DeleteBookmarkButton id={id} />
      </MenuList>
    </Menu>
  )
}
