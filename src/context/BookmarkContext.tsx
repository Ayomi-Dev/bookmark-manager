"use client";

import { useDisclosure } from "@chakra-ui/react";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useUserContext } from "./UserContext";

// Bookmark type
export type Bookmark = {
  id: number;
  title: string;
  tags: string[];
  icon: string;
  url: string;
  description: string;
  timesVisited: number;
  lastVisited: Date;
  createdAt: Date;
};

interface BookmarkContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;

  // For creating/editing bookmark
  tags: string[];
  setTags: (tags: string[]) => void;
  removeTag: (tag: string) => void;

  // For filtering bookmarks
  filterTags: string[];
  addFilterTag: (tag: string) => void;
  removeFilterTag: (tag: string) => void;

  // Bookmarks update and creation
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;

  // Filtered result
  filteredBookmarks: Bookmark[];
  getCountOfTag: (tag: string) => number;

  bookmarkVisits: (id: number) => Promise<void>
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { user } = useUserContext();

    const [tags, setTags] = useState<string[]>([]);

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);


    useEffect(() => {//Loads bookmarks when user changes
        if (!user?.bookmarks) return;
      
        const retrievedBookmarks = user.bookmarks.map(bookmark => ({
          ...bookmark,
          tags: typeof bookmark.tags === "string" ? JSON.parse(bookmark.tags) : bookmark.tags
        }));
      
        setBookmarks(retrievedBookmarks);
    }, [user]);

    useEffect(() => {
        if (filterTags.length === 0) { // Auto-filters whenever bookmarks or filterTags change
          setFilteredBookmarks(bookmarks);
          return;
        }
      
        const filtered = bookmarks.filter(bookmark =>
          filterTags.some(tag => bookmark.tags.includes(tag))
        );
      
        setFilteredBookmarks(filtered);
    }, [filterTags, bookmarks]);

    const addBookmark = (bookmark: Bookmark) => {
      setBookmarks(prev => [...prev, bookmark]); // Adds new bookmark
    };

     //FilterTag controls
    const addFilterTag = (tag: string) => {
      setFilterTags(prev => (prev.includes(tag) ? prev : [...prev, tag]));
    };

    const removeFilterTag = (tag: string) => {
      setFilterTags(prev => prev.filter(t => t !== tag));
    };


    const removeTag = (tag: string) => { //Tag controls for Create Bookmark modal
      setTags(prev => prev.filter(t => t !== tag));
    };

    const getCountOfTag = (tag: string): number => {
      return bookmarks.filter(bookmark => bookmark?.tags?.includes(tag)).length
    }

    //bookmark visit control
    const bookmarkVisits = async(id: number) => {
      try {
        const res = await fetch(`/api/user/bookmarks/${id}/visit`, {
          method: "PATCH"
        })
        const updatedBookmark = await res.json()

        
        setBookmarks(prevBookmarks => 
          prevBookmarks.map(bookmark => bookmark.id === id ? updatedBookmark : bookmark)
        )
      } 
      catch (error) {
        console.log(error, "Failed to update bookmark visit ")
      }
    }

    const value: BookmarkContextType = {
      isOpen,
      onOpen,
      onClose,

      tags,
      setTags,
      removeTag,

      filterTags,
      addFilterTag,
      removeFilterTag,

      bookmarks,
      addBookmark,

      filteredBookmarks,
      getCountOfTag,
      bookmarkVisits
    };

  return (
    <BookmarkContext.Provider value={value}>
        {children}
    </BookmarkContext.Provider>);
};

export const useBookmarkContext = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("BookmarkContext must be used within BookmarkProvider");
  }
  return context;
};
