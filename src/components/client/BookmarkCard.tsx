"use client";
import { Bookmark, useBookmarkContext } from '@/context/BookmarkContext';
import { Badge, Box, Divider, Flex, GridItem, Heading, HStack, Text } from '@chakra-ui/react';
import { Calendar, Eye, Timer1 } from 'iconsax-reactjs';
import { Pushpin } from './Pushpin';
import Image from 'next/image';
import { BookmarkMenu } from './BookmarMenu';
import { formatLastVisited } from '@/utils/LastVisitedFormat';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface BookmarkProp {
    bookmark: Bookmark
}

const MotionBox = motion.create(Box); //motion effects for hover preview

const BookmarkCard = ( { bookmark } : BookmarkProp) => {
    const { bookmarkVisits, deleteBookmark } = useBookmarkContext();
    const dateCreated = new Date(bookmark?.createdAt) //extracts date created info
    const dateVisited = new Date(bookmark?.lastVisited) //extract date last visited info
    const monthCreated = dateCreated.toLocaleString('default', { month: 'short' });
    const dayCreated = dateCreated.getDate()
    const monthVisited = dateVisited.toLocaleString("default", {month: "short"})
    const dayLastVisited = dateVisited.getDate();
    const bookmarkTags = typeof bookmark.tags === "string" ? JSON.parse(bookmark.tags) : bookmark.tags; //parses tags if they are in string format

    const [isHovering, setIsHovering ] = useState(false)

    const handleVisit = () => {
        bookmarkVisits(bookmark.id)

        window.open(bookmark.url, "_blank") //opens the url of the selected bookmark in another tab
    }


    const handleDelete = () => { //deletes selected bookmark
        deleteBookmark(bookmark.id)
     }
    
  return (
        <Box
            position={"relative"}
            borderRadius={"xl"}
            bg={"brand.secBg"}
            px={3}
            py={2}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            boxShadow={"sm"}
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
        >
            {/* <MotionBox
              position="absolute"
              top={"0"}
              left={0}
              width="250px"
              p={3}
              borderRadius="md"
              bg="white"
              _dark={{ bg: "gray.700" }}
              boxShadow="lg"
              zIndex={10}
              pointerEvents="none"
             initial={{ opacity: 0, y: 10 }}
             animate={{
                opacity: isHovering ? 1 : 0,
                y: isHovering ? 0 : 10,
            }}
                transition={{ duration: 0.18 }}
                onClick={ handleVisit }
            >
              <Text fontSize="12px" fontWeight="bold" >
                {bookmark.title}
              </Text>
              <Text fontSize="11px" color="gray.500" noOfLines={1}
                
              >
                {bookmark.url}
              </Text>

              {bookmark.icon && (
                <Box mt={2}>
                  <img
                    src={bookmark.icon}
                    style={{
                      width: "100%",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                </Box>
              )}
            </MotionBox> */}
            <Box>
                <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    w={"full"}
                    h={"60px"}
                    py={2}
                >
                <HStack
                    color={"brand.textLight"}
                    alignItems={"center"}
                    h={"full"}
                    gap={3}
                >
                    <Box
                    w="30px"
                    h="30px"
                    overflow="hidden"
                    borderRadius="50%"
                    position="relative"
                    >
                    <Image
                        src={bookmark.icon}
                        alt="url-img"
                        fill
                        sizes='100%'
                        style={{ objectFit: "cover" }}
                    />
                    </Box>

                        <Box>
                            <Heading fontSize={"xl"}>
                                {
                                    bookmark.title?.length <= 25 
                                    ?
                                    bookmark.title
                                    :
                                    `${bookmark.title?.slice(0,26)}...`
                                }
                            </Heading>
                            <Text 
                                fontSize={"10px"}  
                                onClick={ handleVisit }
                                cursor={"pointer"}
                            >
                                {bookmark.url?.slice(0,40)}...
                            </Text>
                        </Box>
                    </HStack> 
                    <BookmarkMenu id={ bookmark.id } handleDelete={handleDelete}/>
                </Flex>
                <Divider py={1} />
                <Box
                    h={"200px"}
                    py={2}
                    color={"brand.textLight"}
                >
                    <Text fontSize={"sm"}>{bookmark.description}</Text>
                    <Flex gap={2} py={2}>
                        {bookmarkTags?.map((tag: string) => {
                            return (
                            <Text
                                key={tag}
                                borderRadius={"2xl"}
                                bg={"brand.bgLight"}
                                px={2} py={1}
                                fontSize={"8px"}
                            >
                                {tag}
                            </Text>
                            )
                        })}
                    </Flex>
                </Box>
                <Divider />
                <Flex 
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    fontSize={"sm"}
                    pt={1}
                >
                    <Flex gap={3}>
                        <HStack gap={1}>
                            <Eye size={10} variant='Linear'  />
                            <Text fontSize={"xs"}>{bookmark.timesVisited}</Text>
                        </HStack>
                        <HStack gap={1}>
                            <Timer1 size={10} variant='Linear' />
                            <Text fontSize={"xs"}>{monthCreated} {dayCreated}</Text>
                        </HStack>
                        <HStack gap={1}> 
                            <Calendar size={10} variant='Linear' />
                            <Text fontSize={"xs"}>{monthVisited} {dayLastVisited}</Text>
                        </HStack>
                    </Flex>
                    <Pushpin boxSize={6} color="blue.500" cursor="pointer" />
                    
                </Flex>
                <Badge
                    mt={2}
                    fontSize={"8px"}
                    p={1}
                    borderRadius={"7px"}
                    colorScheme={bookmark.lastVisited ? "green" : "gray"}
                >
                    {formatLastVisited(dateVisited.toLocaleString())}
                </Badge>
            </Box>
            

        </Box>
    )
}

export default BookmarkCard