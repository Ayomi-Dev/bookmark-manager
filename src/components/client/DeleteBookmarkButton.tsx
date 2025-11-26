import { useUserContext } from '@/context/UserContext'
import { Button, MenuItem, Text } from '@chakra-ui/react'
import { Trash } from 'iconsax-reactjs'
import React, { FC } from 'react'

interface DeleteButtonProp{
  handleDelete?: () => void
}

const DeleteBookmarkButton: FC<DeleteButtonProp> = ({handleDelete}) => {
   
  return (
    <MenuItem 
      display={"flex"} gap={2}
      onClick={handleDelete}
    >
      <Trash
        size={15}
        variant='Bold' 
        color='red'   
      />
      <Text fontSize={"xs"}> Delete </Text>
    </MenuItem>
  )
}

export default DeleteBookmarkButton;