import { useUserContext } from '@/context/UserContext'
import { useRouter } from 'next/navigation';
import React from 'react'

export const ProtectedRoutes = () => {
    const { user } = useUserContext();
    const router = useRouter()

    if(!user){
        router.push(`/login`)
    }
  return (
    <div>ProtectedRoutes</div>
  )
}
