'use client'

import { ChakraProvider, ColorModeScript, Flex } from '@chakra-ui/react'
import  theme  from './themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ChakraProvider theme={ theme }>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Flex
          overflow={"hidden"}
          h={"100vh"}
        >
          {children}
        </Flex>
    </ChakraProvider> 
  )
}

export default Providers; 