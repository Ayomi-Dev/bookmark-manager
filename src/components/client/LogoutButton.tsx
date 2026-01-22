"use client"

import { useUserContext } from '@/context/UserContext'
import { Button, MenuItem, Text } from '@chakra-ui/react'
import { Logout } from 'iconsax-reactjs'
import React from 'react'

const LogoutButton = () => {
    const { logout, user } = useUserContext()
    
    const handleLogout = () => {
      logout()
    }
  return (
    <MenuItem
    display={"flex"}
    gap={2}
     onClick={ handleLogout }
    >
        <Logout variant="Bold" color={"red"} size={15} />
        <Text>Logout</Text>
    </MenuItem>
  )
}

export default LogoutButton