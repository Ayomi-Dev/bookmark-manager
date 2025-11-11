"use client"

import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Tag, TagCloseButton, TagLabel, Text, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react"
import { InputComponent } from "./InputComponent"
import { ChangeEvent, FormEvent, useState } from "react"
import { useBookmarkContext } from "@/context/BookmarkContext"
import Select from "react-select"
import { Tags } from "@/types"





const AddBookmarkModal = () => {
    const tagOptions = Tags.map( tag => ( 
        { 
            value: tag,
            label: tag
        }
    ))
    const { isOpen, onClose, tags, setTags, removeTags } = useBookmarkContext()
    const [bookmarkInfo, setBoomarkInfo] = useState({
      title: "",
      description: "",
      url: "",
      tags: JSON.stringify( tags ),
      icon: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setBoomarkInfo({...bookmarkInfo, [e.target.name]: e.target.value})
    }

    const handleAddBookmark = async(e: FormEvent) => {
        e.preventDefault();
        try {
          const res = await fetch("http://localhost:3000/api/user/bookmarks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify( bookmarkInfo )
          } )
          const data = await res.json();
          if(!res.ok){
            throw new Error("Cannot create bookmark")
          }
          console.log(data.newBookmark)
        }
        catch (error) {
          console.log(error)
        }

    }
  return (
     <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <form onSubmit={handleAddBookmark}>
          <ModalCloseButton bg="#F6F6FA" borderRadius="50%" />
          <ModalBody py={5}>
            <InputComponent name="title" type="text" label="Title" onChange={handleChange} />
            <InputComponent name="description" type="text" label="Description" onChange={handleChange} />
            <InputComponent name="url" type="text" label="Web URL" onChange={handleChange} />

            {/* Multi-select input */}
            <Box mt={4}>
              <Text fontWeight="500" color="gray.600" mb={1}>
                Tags
              </Text>
              <Select
                isMulti
                name="tags"
                options={tagOptions}
                value={tagOptions.filter(option => tags.includes(option.value))}  //prevents duplicating tags
                onChange={(newValue) => setTags(newValue.map(option => option.value))}
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
            {tags.length > 0 && (
              <Box mt={3}>
                <Text fontSize="sm" color="gray.500" mb={2}>
                  Selected tags:
                </Text>
                <Wrap>
                  {tags.map((tag) => (
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
          </ModalBody>

          <ModalFooter>
            <Button
              type="submit"
              size="md"
              colorScheme="teal"
              loadingText="Adding Bookmark..."
            >
              Add Bookmark
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default AddBookmarkModal;