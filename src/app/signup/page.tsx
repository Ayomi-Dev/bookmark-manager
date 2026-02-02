"use client"


import { InputComponent } from '@/components/client/InputComponent'
import { Box, Button, Flex, HStack, Text } from '@chakra-ui/react'
import { Lock, Message, User } from 'iconsax-reactjs'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PageWrapper } from '@/utils/PageWrapper'
import NotificationModal from '@/utils/NotificationModal'
import { useUserContext } from '@/context/UserContext'
import Link from 'next/link'

const SignUpPage = () => {
  const {getUser, user} = useUserContext();
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [notification, setNotification] = useState({ // Set notification state 
    show: false,
    type: "info" as "success" | "error" | "info",
    message: "",
    loading: false
  });

  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }

  const signupUser = async(e: FormEvent) => {
    e.preventDefault();
    setNotification({
        show: true,
        type: "info",
        message: `Please wait...`,
        loading: true
      })

    try {
      
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( userInfo )
      });
      
      if(!res.ok){
        throw new Error("something went wrong")
      }
      else{
        getUser();
        setTimeout(() => {
          setNotification({
            show: true,
            type: "success",
            message: `Welcome onboard ${user?.name}`,
            loading: false
          })
        }, 1500);


        setTimeout(() => { 
          router.push('/user/profile') //redirects to user's profile page after signup is complete
        }, 3000);
      }
      

    } catch (error) {
      console.log(error)
      setNotification({
        show: true,
        type: "error",
        message: `Error signing you up. Please try again!`,
        loading: false
      })
    }

  }


  

  const closeNotification = () => { // closes notification modal
     setNotification((prev) => ({ ...prev, show: false }));
   }
  return (
      <PageWrapper>
        <Box
          width={"500px"}
          mx={"auto"}
          bg={"brand.secBg"}
          h={"300px"}
          borderRadius={"10px"}
          px={5} 
          pt={3}
          mt={3}
        >
          <form onSubmit={signupUser} > 
    
            <HStack
            >
              <User size={15} variant='Linear' color='black' />
              <InputComponent type="text" name='name' label='Name' onChange={handleInputChange} />
            </HStack>
            <HStack
            >
              <Message size={15} variant='Linear' color='black' />
              <InputComponent type="email" name='email' label='Email' onChange={handleInputChange} />
            </HStack>
            <HStack>
              <Lock variant='Linear' size={15} color='black' />
              <InputComponent type="password" name='password' label='Password' onChange={handleInputChange} />
            </HStack> 
    
            <Flex
              justifyContent={"center"}
              w={"100%"}
              flexDir={"column"}
              gap={2}
              alignItems={"center"}
              mx={"auto"}
            >
              <Button 
                type='submit'
                size={"sm"}
              >
                Sign Up
              </Button>
              <Text fontSize={"sm"}>
                Already have an account? 
                <Text 
                  as={Link} 
                  color={'brand.accentDark'} 
                  px={3} 
                  href={"/login"}
                  fontWeight={"bold"}
                >
                  Login
                </Text>
              </Text>
    
            </Flex>
          </form>
          <NotificationModal
            show={notification.show}
            type={notification.type}
            message={notification.message}
            onClose={closeNotification}
            loading={notification.loading}
          />
        </Box>
      </PageWrapper>
  )
}
export default SignUpPage;