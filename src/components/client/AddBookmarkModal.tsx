"use client"

import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Tag, TagCloseButton, TagLabel, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { InputComponent } from "./InputComponent"
import { ChangeEvent, FormEvent, useState } from "react"
import { useBookmarkContext } from "@/context/BookmarkContext"
import Select from "react-select"
import { Tags } from "@/types"
import NotificationModal from "@/utils/NotificationModal"
import { useUserContext } from "@/context/UserContext"
import { useRouter } from "next/navigation"





const AddBookmarkModal = () => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const tagOptions = Tags.map( tag => ( 
    { 
        value: tag,
        label: tag
    }
  ))
  const { isOpen, onClose, tags, setTags, removeTag, getBookmarks } = useBookmarkContext();
  const [url, setUrl] = useState("");
  const [bookmarkInfo, setBoomarkInfo] = useState({}); //
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
    setBoomarkInfo({...bookmarkInfo, [e.target.name]: e.target.value})
  }
  const [notification, setNotification] = useState({ // Set notification state 
    show: false,
    type: "info" as "success" | "error" | "info",
    message: "",
    loading: false
  });
  
  const closeNotification = () => { // closes notification modal
    setNotification((prev) => ({ ...prev, show: false }));
  }
  const handleAddBookmark = async(e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if(!user){
      router.push('/login')
      onClose()
      setLoading(false)
      return;
    }

    try {
      const metadataRes = await fetch("/api/user/bookmarks/metadata", { //fsends the url to the backend api route
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      })
      const metadata = await metadataRes.json() //extracts the response so that its data  can be used in the next request
      if(!metadataRes){
        throw new Error("Cannot fetch metadata at this time, please try again!");
      }
      const data = await fetch("/api/user/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          url,
          title: metadata.title,
          description: metadata.description,
          tags: JSON.stringify( tags ),
          icon: !metadata.logo ? metadata.image : metadata.logo
        })
      })
      if(!data.ok){
        throw new Error("Cannot add bookmark at this time, please try again!")
      }
      else{
        await getBookmarks();
        setNotification({
          show: true,
          type: "success",
          message:`Bookmark successfully added!`,
          loading: false
        });
        setUrl("")
        setTags([]);
        onClose();
      }
    }
    catch (error) {
      console.log(error)
      setNotification({
        show: true,
        type: "error",
        message:`${error}`,
        loading: false
      }); 
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <Box>
     <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="800px">
        <form onSubmit={handleAddBookmark}>
          <ModalCloseButton bg="#F6F6FA" borderRadius="50%" />
          <ModalBody py={5}>
            <InputComponent 
              name="url" 
              required 
              type="text" 
              label="Paste URL here" 
              value={url} 
              onChange={handleChange} />

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
                          onClick={() => removeTag(tag)}
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
              isLoading={loading}
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
      <NotificationModal
          show={notification.show}
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
          loading={notification.loading}
        />
    </Box>
  )
}

export default AddBookmarkModal;