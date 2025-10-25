'use client'

import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import  theme  from './themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={ theme }>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Box
          overflow={"hidden"}
          h={"100vh"}
        >
          {children}
        </Box>
    </ChakraProvider> 
  )
}

export default Providers; 