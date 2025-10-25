"use client"

import { IconButton } from "@chakra-ui/react"
import { UserCirlceAdd } from "iconsax-reactjs"


export const UserIcon = () => {
  return (
    <IconButton 
      aria-label="user" 
      variant={"outline"}
      icon={<UserCirlceAdd variant="Bold" size={30} cursor={"pointer"} />} />
  )
}
