"use client"


import { Box } from '@chakra-ui/react'
import React, { ChangeEvent, FormEvent, useState } from 'react'

const SignUpPage = () => {
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
      
      const data = res.json();
      console.log(data);

    } catch (error) {
      console.log(error)
    }

  }
  return (
       <form onSubmit={signupUser}>
        <input type="email" name='email' onChange={handleInputChange} />
        <input type="password" name='password' onChange={handleInputChange} />
        <input type='text' name='name' onChange={handleInputChange} />

        <button type='submit'>Signup</button>
       </form>
  )
}
export default SignUpPage;