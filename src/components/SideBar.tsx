import { Box } from '@chakra-ui/react'
import React from 'react'

const SideBar = () => {
  return (
    <Box 
      h={"100vh"} 
      w={"20%"}
      bg={"brand.secBg"}
      _dark={{bg: "brand.bgDark"}}
      overflow={"auto"}
    >
      this is sidebar
    </Box>
  )
}

export default SideBar