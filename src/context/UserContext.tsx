"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Bookmark } from "./BookmarkContext";

interface User {
    id: string;
    name: string;
    email: string;
    bookmarks: Bookmark[]
}

interface UserContextType {
    user: User | null;
    logout: () => Promise<void>
    login: (newUser: User) => void
    getUser: () => Promise<void>
}


const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserContextProvider = ( { children } : { children : ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    const getUser = async() => {
        try {
            const response = await fetch("/api/user/profile", 
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                }
            );

            const data = await response.json()
            if(!response.ok){
                throw new Error("Session expired!")
            }
            else{
                setUser(data.user)
            }

        } catch (error) {
            console.log( error )
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const login = (newUser: User) => {
        setUser( newUser )
    }

    const logout = async () => {
        try {
            const res =  await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            if(!res.ok){
                throw new Error("Log out failed")
            }
            else{
                setUser( null )
            }
        }
        catch (error) {
           console.log(error, `Logout failed, Please try again`) 
        }
    }


    const values = { user, logout, login, getUser }
    return (
        <UserContext.Provider value={ values }>
            { children }
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error("Context must live within a provider");
    }

    return context;
}