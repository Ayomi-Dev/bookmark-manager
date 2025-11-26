"use client"

import { Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { Archive, Edit } from "iconsax-reactjs"
import { MoreVertical } from "./MoreVerticalIcon"
import DeleteBookmarkButton from "./DeleteBookmarkButton"
import Link from "next/link"
import { FC } from "react"
import { useBookmarkContext } from "@/context/BookmarkContext"


interface BookmarkMenuProp {
  id: number;
  handleDelete?: () => void
}

export const BookmarkMenu: FC<BookmarkMenuProp> = ({id, handleDelete}) => {
  const { toggleArchive } = useBookmarkContext()
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
         onClick={() => toggleArchive(id)}
         >
            <Archive variant="Linear" size={15} />
            <Text fontSize={"xs"} > Archive </Text>
        </MenuItem>
        <DeleteBookmarkButton handleDelete={handleDelete}   />
      </MenuList>
    </Menu>
  )
}
