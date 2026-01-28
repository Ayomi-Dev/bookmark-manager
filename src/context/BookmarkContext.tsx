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
  isArchived: boolean;
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
  getBookmarks: () => Promise<void>;

  // Filtered result
  filteredBookmarks: Bookmark[];
  getCountOfTag: (tag: string) => number;

  bookmarkVisits: (id: number) => Promise<void>

  //delete control
  deleteBookmark: (id: number) => Promise<void>

  //archive control
  toggleArchive: (id: number) => Promise<void>
  archivedBookmarks: Bookmark[];

  //toggle side bar for bookmarkk tags
  openSideBar: boolean;
  toggleSideBar: () => void
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: ReactNode }) => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const { user } = useUserContext();
    const [tags, setTags] = useState<string[]>([]);
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [filterTags, setFilterTags] = useState<string[]>([]);
    const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
    const [archivedBookmarks, setArchivedBookmarks] = useState<Bookmark[]>([])
    const [openSideBar, setOpenSideBar] = useState<boolean>(false);


    const toggleSideBar = () => {
      setOpenSideBar(!openSideBar)
    }


    const getBookmarks = async () => {
      try {
        const res = await fetch(`/api/user/bookmarks`, {
          method: "GET",
        })

        if(!res.ok){
          throw new Error("Couldn't fetch bookmarks at this time");
        }
        const data = await res.json();
        setBookmarks(data.bookmarks.filter((bookmark: Bookmark) => !bookmark.isArchived));
        setArchivedBookmarks(data.bookmarks.filter((bookmark: Bookmark) => bookmark.isArchived));
      }
      catch (error) {
       console.log(`${error}: No bookmarks`) 
      }
    }
    useEffect(() => {//Loads bookmarks once user logs in
      if(user){
        getBookmarks();
      } 
    }, [user]);

    useEffect(() => {
      if (filterTags.length === 0) { // Auto-filters whenever bookmarks or filterTags change
        setFilteredBookmarks(bookmarks);
        return;
      }
      
      const filtered = bookmarks?.filter(bookmark =>
        filterTags.some(tag => bookmark.tags.includes(tag))
      );
      
      setFilteredBookmarks(filtered);
    }, [filterTags, bookmarks]);

    

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

    const getCountOfTag = (tag: string): number => { //returns the coubnt of bookmarks with a specific tag
      return bookmarks?.filter(bookmark => bookmark?.tags?.includes(tag)).length
    }

    //bookmark visit control
    const bookmarkVisits = async(id: number) => {
      try {
        await fetch(`/api/user/bookmarks/${id}/visit`, {
          method: "PATCH"
        })
        getBookmarks();
      } 
      catch (error) {
        console.log(error, "Failed to update bookmark visit ")
      }
    }

     const deleteBookmark = async( id: number ) => {
      try {
        const res = await fetch(`/api/user/bookmarks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            userId: `${user?.id}`
          },

        })
        const data = await res.json();
        if(!res.ok){
          throw new Error(data.error || "Failed to delete")
        }

        await getBookmarks();
      } 
      catch (error) {
          console.log(error, "Unable to delete bookmark!")
      }
    }

      //Bookmark archive controls
    const toggleArchive = async(id: number) => {
      try {
        const res =  await fetch(`/api/user/bookmarks/archived/${id}`, {
          method: "PATCH",
        });
        // const data = await res.json();
        if(!res.ok){
          throw new Error( "Failed to archived bookmark!")
        }
        await getBookmarks();

      }
      catch (error) {
        console.log(error, "Archive bookmark failed!")
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
      getBookmarks,

      filteredBookmarks,
      getCountOfTag,
      bookmarkVisits,
      deleteBookmark,

      toggleArchive,
      archivedBookmarks,

      openSideBar,
      toggleSideBar
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
