"use client"
import { InputComponent } from '@/components/client/InputComponent'
import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import { Lock, Message2, MessageNotif, MessageSquare, PasswordCheck } from 'iconsax-reactjs'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const LoginPage = () => {
    // const borderColor = useColorModeValue("blue.200", "blue.400");
  
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
    
    console.log(userInfo)
  }
  const loginUser = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "applcation/json"
        },
        body: JSON.stringify( userInfo )
      })

      if(!res.ok){
        throw new Error("Something went wrong!")
      }
      const data = res.json()
      console.log(data)
    } 
    catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      width={"500px"}
      mx={"auto"}
      bg={"brand.secBg"}
      h={"500px"}
      borderRadius={"10px"}
      px={5}
      pt={3}
      mt={3}
    >
      <form onSubmit={loginUser} > 
        <HStack
        >
          <MessageNotif size={15} variant='Linear' />
          <InputComponent type="email" name='email' label='Email' onChange={handleInputChange} />
        </HStack>

        <HStack>
          <Lock variant='Linear' size={15} />
          <InputComponent type="password" name='password' label='Password' onChange={handleInputChange} />
        </HStack>

        <Flex
          justifyContent={"center"}
          w={"200px"}
          mx={"auto"}
        >
          <Button 
            type='submit'
            size={"sm"}
          >
            Login
          </Button>

        </Flex>
      </form> 
    </Box>
  )
}

export default LoginPage;
