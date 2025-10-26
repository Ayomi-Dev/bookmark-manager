"use client"


import { InputComponent } from '@/components/client/InputComponent'
import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { Lock, Message, MessageNotif, User } from 'iconsax-reactjs'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
      setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }

  const signupUser = async(e: FormEvent) => {
    e.preventDefault();

    try {
      
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( userInfo )
      });
      
      if(!res.ok){
        throw new Error("something went wrong")
      }
      
      const data = await res.json();
      // console.log(data);
      setTimeout(() => {
        router.push('/user/profile')
      }, 1500);

    } catch (error) {
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
        <form onSubmit={signupUser} > 
  
          <HStack
          >
            <User size={15} variant='Linear' />
            <InputComponent type="text" name='name' label='Name' onChange={handleInputChange} />
          </HStack>
          <HStack
          >
            <Message size={15} variant='Linear' />
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
              Sign Up
            </Button>
  
          </Flex>
        </form> 
      </Box>
  )
}
export default SignUpPage;