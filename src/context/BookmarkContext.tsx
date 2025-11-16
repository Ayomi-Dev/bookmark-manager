"use client"

import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

export type Bookmark = {
    id: number;
    title: string;
    tags: string[];
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
    bookmarks: Bookmark[];
    addBookmark: (bookmark: Bookmark) => void
}

const BookmarkContext= createContext<BookmarkType | undefined>(undefined);

export const BookmarkProvider = ({ children} : { children : ReactNode}) => { 
    const {onClose, onOpen, isOpen } = useDisclosure()
    const [ tags, setTags ] = useState<string[]>([]);
    const { user } = useUserContext();
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    useEffect(() => { //updates bookmarks whenever user changes i.e bookmark becomes accessible only when user is not null
        if(!user?.bookmarks) return;
        const retrievedBookmarks = user.bookmarks.map((bookmark) => (
            {
                ...bookmark,
                tags: typeof bookmark.tags === "string" ? JSON.parse(bookmark.tags) : bookmark.tags
             }
        ))
        setBookmarks(retrievedBookmarks)
    }, [user]);
    
    const addBookmark = (bookmark: Bookmark) => {
        setBookmarks(prevBookmarks => 
            [...prevBookmarks, bookmark]
        )
    }
    const addTags = (tag: string) => {
        setTags(prevTags => 
            prevTags.includes(tag) ? prevTags : [...prevTags, tag]
        )
    }


    const removeTags = (selectedTag: string) => {
        setTags(prevTags => prevTags.filter(tag => tag !== selectedTag  ))
    }
    const value = {
        onClose, 
        onOpen, 
        isOpen, 
        tags, 
        setTags, 
        removeTags, 
        addTags, 
        bookmarks,
        addBookmark
    }
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