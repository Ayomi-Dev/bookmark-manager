"use client"
import { InputComponent } from '@/components/client/InputComponent'
import { useUserContext } from '@/context/UserContext'
import NotificationModal from '@/utils/NotificationModal'
import { PageWrapper } from '@/utils/PageWrapper'
import { Box, Button, Flex, HStack } from '@chakra-ui/react'
import { Lock,  MessageNotif } from 'iconsax-reactjs'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const LoginPage = () => {
  const router = useRouter();  
  const { getUser } = useUserContext()
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  const [notification, setNotification] = useState({ // Set notification state 
    show: false,
    type: "info" as "success" | "error" | "info",
    message: "",
    loading: false
  });

   const closeNotification = () => { // closes notification modal
     setNotification((prev) => ({ ...prev, show: false }));
   }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }
  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    setNotification({
        show: true,
        type: "info",
        message:`Please wait!...`,
        loading: true
      });

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
      else{
        await getUser()
        setTimeout(() => {
          setNotification({
          show: true,
          type: "success",
          message:`Welcome back! Redirecting to your profile...`,
          loading: false
        });
        }, 2000)
      }
      
      setTimeout(() => {
        router.push('/user/profile')
      }, 3000)
    } 
    catch (error) {
      console.log(error);
      setNotification({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again.",
        loading: false
      });
    }
  }

  return (
    <PageWrapper>
      <Box
        width={"500px"}
        mx={"auto"}
        bg={"brand.secBg"}
        h={"300px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
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
            <Lock variant='Linear' size={15} color='black' />
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
          loading={notification.loading}
        />
      </Box>

    </PageWrapper>
  )
}

export default LoginPage;
