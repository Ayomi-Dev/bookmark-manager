"use client"

import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Tag, TagCloseButton, TagLabel, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useBookmarkContext } from "@/context/BookmarkContext"
import Select from "react-select"
import { Tags } from "@/types"
import { useParams } from "next/navigation"
import { InputComponent } from "@/components/client/InputComponent"
import { PageWrapper } from "@/utils/PageWrapper"





const EditBookmark= () => {
    const { id } = useParams()
    const { removeTags, bookmarks } = useBookmarkContext()
    const bookmark = bookmarks.find( bookmark => bookmark.id === Number(id));
    const [ newTags, setNewTags ] = useState(bookmark?.tags) //grabs the current tags of the selected bookmark
    

    const [bookmarkInfo, setBoomarkInfo] = useState({
        title: "",
        description: "",
    })

    useEffect(() => {
        const getCurrentBookmark = async () => {
            try {
                const res = await fetch(`/api/user/bookmarks/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json"
                    }
                })
                const data = await res.json();
                if(!res.ok){
                    throw new Error("Cannot get bookmark at this time")
                }
                setBoomarkInfo(data.bookmark)
            }
            catch (error) {
               console.log(error) 
            }
        }
        getCurrentBookmark()
    }, [])
    const tagOptions = Tags.map( tag => ( 
        { 
            value: tag,
            label: tag
        }
    ))


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setBoomarkInfo({...bookmarkInfo, [e.target.name]: e.target.value})
    }

    const handleEditBookmark = async(e: FormEvent) => {
        e.preventDefault();
        console.log("req sent")
        try {
          const  res = await fetch(`/api/user/bookmarks/${id}`, { //fsends the url to the backend api route
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({...bookmarkInfo, tags: JSON.stringify(newTags) })
          })
          const data = await res.json() //extracts the response so that its data  can be used in the next request
          if(!res.ok){
            throw new Error("Cannot fetch metadata at this point, please try again!");
          }
          setBoomarkInfo(data.bookmark)
        //   console.log(bookmarkInfo?.tags)

          
        }
        catch (error) {
          console.log(error)
        }

    }
  return (
    <PageWrapper>
        <Box
            width={"500px"}
            mx={"auto"}
            bg={"brand.secBg"}
            h={"500px"}
            borderRadius={"10px"}
            px={5}
            pt={3}
            mt={3}
        >
            <form onSubmit={handleEditBookmark}>
                <InputComponent name="title" type="text" label="Title" value={bookmarkInfo?.title} onChange={handleChange} />
                <InputComponent name="description" type="text" label="Description" value={bookmarkInfo?.description} onChange={handleChange} />

                {/* Multi-select input */}
                <Box mt={4}>
                <Text fontWeight="500" color="gray.600" mb={1}>
                    Tags
                </Text>
                <Select
                    isMulti
                    name="tags"
                    options={tagOptions}
                    value={tagOptions.filter(option => newTags?.includes(option.value))}  //prevents duplicating tags
                    onChange={(newValue) => setNewTags(newValue.map(option => option.value))}
                    placeholder="Select tags..."
                    classNamePrefix="react-select"
                    styles={{
                    control: (base) => ({
                        ...base,
                        borderColor: "#E2E8F0",
                        borderRadius: "8px",
                        padding: "2px",
                        boxShadow: "none",
                        "&:hover": { borderColor: "#CBD5E0" },
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                        ? "#319795"
                        : state.isFocused
                        ? "#E6FFFA"
                        : "white",
                        color: state.isSelected ? "white" : "#2D3748",
                    }),
                    }}
                />
                </Box>

                {/* Live preview of selected tags with remove button */}
                {newTags && newTags?.length > 0 && (
                <Box mt={3}>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                    Selected tags:
                    </Text>
                    <Wrap>
                    {newTags?.map((tag) => (
                        <WrapItem key={tag}>
                        <Tag
                            size="md"
                            variant="subtle"
                            bg="teal.700"
                            color="brand.secBg"
                            px={3}
                            py={1}
                            borderRadius="full"
                        >
                            <TagLabel>{tag}</TagLabel>
                            <TagCloseButton
                            onClick={() => removeTags(tag)}
                            />
                        </Tag>
                        </WrapItem>
                    ))}
                    </Wrap>
                </Box>
                )}

                <Button
                type="submit"
                size="md"
                colorScheme="teal"
                loadingText="Adding Bookmark..."
                >
                Add Bookmark
                </Button>
            </form>
        </Box>
    </PageWrapper>
  )
}

export default EditBookmark;