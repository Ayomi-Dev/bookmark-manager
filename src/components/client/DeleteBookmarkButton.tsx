import { useUserContext } from '@/context/UserContext'
import { Button, MenuItem, Text } from '@chakra-ui/react'
import { Trash } from 'iconsax-reactjs'
import React, { FC } from 'react'

type DeleteBookmarkButtonProp = {
    id: number
}
const DeleteBookmarkButton: FC<DeleteBookmarkButtonProp> = ({ id }) => {
    const { user } = useUserContext()
    const handleDelete = async( id: number ) => {
        try {
          const res = await fetch(`/api/user/bookmarks/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              userId: `${user?.id}`
            },

          })
          const data = await res.json();
          if(!res.ok){
            throw new Error(data.error || "Failed to delete")
          }
          else{
            window.location.reload()
          }
        } 
        catch (error) {
            console.log(error, "unable to delete bookmark!")
        }
    }
  return (
    <MenuItem display={"flex"} gap={2} onClick={() => handleDelete(id)}>
      <Trash
        size={15}
        variant='Bold' 
        color='red'   
        onClick={() => handleDelete(id)}
      />
      <Text fontSize={"xs"}> Delete </Text>
    </MenuItem>
  )
}

export default DeleteBookmarkButton;