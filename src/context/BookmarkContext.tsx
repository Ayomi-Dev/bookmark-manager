"use client"

import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useState } from "react";

export type Bookmark = {
    id: number;
    title: string;
    tags: [];
    icon: string;
    url: string;
    description: string;
    timesVisited: number;
    lastVisited: Date;
    createdAt: Date
}

interface BookmarkType {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    removeTags: (selectedTag: string) => void;
    addTags: (tag: string) => void;
}

const BookmarkContext= createContext<BookmarkType | undefined>(undefined);

export const BookmarkProvider = ({ children} : { children : ReactNode}) => { 
    const {onClose, onOpen, isOpen } = useDisclosure()
    const [ tags, setTags ] = useState<string[]>([]);

    const addTags = (tag: string) => {
        setTags(prevTags => 
            prevTags.includes(tag) ? prevTags : [...prevTags, tag]
        )
    }

    const removeTags = (selectedTag: string) => {
        setTags(prevTags => prevTags.filter(tag => tag !== selectedTag  ))
    }
    const value = {onClose, onOpen, isOpen, tags, setTags, removeTags, addTags}
    return (
        <BookmarkContext.Provider value={ value }>
            { children }
        </BookmarkContext.Provider>
    )

}

export const useBookmarkContext = () => {
    const context = useContext(BookmarkContext);
    if(!context){
        throw new Error("conttext must be within a provider")
    }
    return context;
}