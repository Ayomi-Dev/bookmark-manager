import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const SignUpButton = () => {
  return (
    <Button
        size={"lg"}
        borderRadius={"20px"}
        px={20}
    >
        <Link href={'/signup'}>
            Sign Up
        </Link>
    </Button>
  )
}

export default SignUpButton;