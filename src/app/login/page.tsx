"use client"
import { InputComponent } from '@/components/client/InputComponent'
import NotificationModal from '@/components/NotificationModal'
import { Box, Button, Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import { Lock, Message2, MessageNotif, MessageSquare, PasswordCheck } from 'iconsax-reactjs'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const LoginPage = () => {
  const router = useRouter();  
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  const [notification, setNotification] = useState({ // Set notification state 
    show: false,
    type: "info" as "success" | "error" | "info",
    message: "",
  });

   const closeNotification = () => { // closes notification modal
     setNotification((prev) => ({ ...prev, show: false }));
   }

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
      const data = await res.json()
      console.log(data?.user, "User logged in")
      setNotification({
        show: true,
        type: "success",
        message:`Welcome back ${data?.user.name}!...`,
      });

      setTimeout(() => {
        router.push('/user/profile')
      }, 5000)
    } 
    catch (error) {
      console.log(error);
      setNotification({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again.",
      });
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

      <NotificationModal
        show={notification.show}
        type={notification.type}
        message={notification.message}
        onClose={closeNotification}
      />
    </Box>
  )
}

export default LoginPage;
