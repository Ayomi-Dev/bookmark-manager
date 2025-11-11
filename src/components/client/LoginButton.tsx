"use client"
import { useUserContext } from '@/context/UserContext'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const LoginButton = () => {
    const { user } = useUserContext()
  return (
    !user && 
    (<Button
        size={"lg"}
    >
        <Link href={`/login`}>
            Login
        </Link>
    </Button>)
  )
}

export default LoginButton