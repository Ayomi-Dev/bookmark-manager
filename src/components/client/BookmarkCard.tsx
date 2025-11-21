"use client";
import { Bookmark, useBookmarkContext } from '@/context/BookmarkContext';
import { Box, Divider, Flex, GridItem, Heading, HStack, Text } from '@chakra-ui/react';
import { Calendar, Eye, Timer1 } from 'iconsax-reactjs';
import { Pushpin } from './Pushpin';
import Image from 'next/image';
import { BookmarkMenu } from './BookmarMenu';

interface BookmarkProp {
    bookmark: Bookmark
}

const BookmarkCard = ( { bookmark }: BookmarkProp) => {
    const { bookmarkVisits } = useBookmarkContext();

    const handleVisit = () => {
        bookmarkVisits(bookmark.id)

        window.open(bookmark.url, "_blank") //opens the url once the selected bookmark is opened
    }
    
  return (
        <GridItem
            borderRadius={"xl"}
            bg={"brand.secBg"}
            px={3}
            py={2}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
            onClick={ handleVisit }
        >
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
                        <Text fontSize={"10px"}>{bookmark.url?.slice(0,40)}...</Text>
                    </Box>
                </HStack> 
                <BookmarkMenu id={ bookmark.id }/>
            </Flex>
            <Divider py={1} />
            <Box
                h={"200px"}
                py={2}
                color={"brand.textLight"}
            >
                <Text fontSize={"sm"}>{bookmark.description}</Text>
                <Flex gap={2} py={2}>
                    {bookmark.tags.map(tag => {
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
                py={3}
            >
                <Flex gap={3}>
                    <HStack gap={1}>
                        <Eye size={10} variant='Linear'  />
                        <Text fontSize={"xs"}>{bookmark.timesVisited}</Text>
                    </HStack>
                    <HStack gap={1}>
                        <Timer1 size={10} variant='Linear' />
                        <Text fontSize={"xs"}>{bookmark.timesVisited}</Text>
                    </HStack>
                    <HStack gap={1}> 
                        <Calendar size={10} variant='Linear' />
                        <Text fontSize={"xs"}>{bookmark.timesVisited}</Text>
                    </HStack>
                </Flex>
                <Pushpin boxSize={6} color="blue.500" cursor="pointer" />
                
            </Flex>
        </GridItem>
    )
}

export default BookmarkCard