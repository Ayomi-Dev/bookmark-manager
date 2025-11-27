"use client"

import { Box, Button,  Tag, TagCloseButton, TagLabel, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Bookmark, useBookmarkContext } from "@/context/BookmarkContext"
import Select from "react-select"
import { Tags } from "@/types"
import { useParams, useRouter } from "next/navigation"
import { InputComponent } from "@/components/client/InputComponent"
import { PageWrapper } from "@/utils/PageWrapper"
import NotificationModal from "@/utils/NotificationModal"





const EditBookmark= () => {
    const { id } = useParams()
    const { getBookmarks } = useBookmarkContext();
    const [ newTags, setNewTags ] = useState<string[]>() //grabs the current tags of the selected bookmark
    const router = useRouter();
    const [loading, setLoading ] = useState(false)
    const [bookmarkInfo, setBoomarkInfo] = useState({
        title: "",
        description: "",
    });
    const [notification, setNotification] = useState({ // Set notification state 
        show: false,
        type: "info" as "success" | "error" | "info",
        message: "",
        loading: false
      });
      
    const closeNotification = () => { // closes notification modal
        setNotification((prev) => ({ ...prev, show: false }));
    }

    

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
                else{
                    setNewTags(JSON.parse(data.bookmark.tags))
                    setBoomarkInfo({
                        title: data.bookmark.title,
                        description: data.bookmark.description
                    })
                }
            }
            catch (error) {
               console.log(error) 
            }
        }
        getCurrentBookmark()
    }, [])

    
    const tagOptions = Tags.map( tag => ( //transforms tags into object
        { 
            value: tag,
            label: tag
        }
    ))


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setBoomarkInfo({...bookmarkInfo, [e.target.name]: e.target.value})
    }

    const removeTagFromSelected = (tag: string) => {
        setNewTags(prevTags => prevTags?.filter(t => t !== tag))
    }

    const handleEditBookmark = async(e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
          const  res = await fetch(`/api/user/bookmarks/${id}`, { //sends the url to the backend api route
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({...bookmarkInfo, tags: JSON.stringify(newTags) })
          })
          if(!res.ok){
            setLoading(false)
            throw new Error("Cannot fetch metadata at this point, please try again!");
          }
          else{
            setBoomarkInfo({
                title: "",
                description: ""
            })
            setNotification({
                show: true,
                type: "success",
                message:`Bookmark successfully updated!`,
                loading: false
            });
            await getBookmarks();
            router.push(`/user/profile`) //redirects to the profile page after successful bookmark edit
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
                <Box mt={3} py={2}>
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
                            onClick={() => removeTagFromSelected(tag)}
                            />
                        </Tag>
                        </WrapItem>
                    ))}
                    </Wrap>
                </Box>
                )}

                <Button
                isLoading={loading}
                type="submit"
                size="md"
                colorScheme="teal"
                loadingText="Updating Bookmark..."
                >
                    Update Bookmark
                </Button>
            </form>
        </Box>
        <NotificationModal
            show={notification.show}
            type={notification.type}
            message={notification.message}
            onClose={closeNotification}
            loading={notification.loading}
        />
    </PageWrapper>
  )
}

export default EditBookmark;