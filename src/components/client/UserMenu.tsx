"use client"

import { IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react"
import { Logout, User, UserCirlceAdd } from "iconsax-reactjs"
import LogoutButton from "./LogoutButton"
import { useUserContext } from "@/context/UserContext"


export const UserMenu = () => {
  const { user } = useUserContext()
  return (
    user &&
    <Menu>
      <MenuButton 
        as={"button"}
      >
        <UserCirlceAdd variant="Outline" size={30} cursor={"pointer"} />
      </MenuButton>
      <MenuList>
        <MenuItem display={"flex"} gap={2}>
          <User variant="Linear" size={15} />
          <Text> Profile </Text>
        </MenuItem>
        <LogoutButton />
      </MenuList>
    </Menu>
  )
}
