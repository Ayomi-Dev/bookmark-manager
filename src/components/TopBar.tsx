import { Box } from '@chakra-ui/react'
import React from 'react'

const TopBar = () => {
  return (
    <Box 
      h={"80px"} 
      w={"100%"}
      bg={"brand.secBg"}
      position={"sticky"}
      top={0}
    >
      this is topbar
    </Box>
  )
}

export default TopBar;