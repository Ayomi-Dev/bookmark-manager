"use client";
import { Bookmark } from '@/context/BookmarkContext';
import { Box, Divider, Flex, GridItem, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { Calendar, Eye, Timer1 } from 'iconsax-reactjs';
import { MoreVertical } from './MoreVerticalIcon';
import { Pushpin } from './Pushpin';
import { DeleteBookmarkButton } from './DeleteBookmarkButton';
import Image from 'next/image';

interface BookmarkProp {
    bookmark: Bookmark
}

const BookmarkCard = ( { bookmark }: BookmarkProp) => {
    console.log(bookmark.tags.map(tag => (tag)))
  return (
        <GridItem
            borderRadius={"xl"}
            bg={"brand.secBg"}
            px={3}
            display={"flex"}
            flexDir={"column"}
            justifyContent={"space-between"}
        >
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"full"}
                h={"60px"}
                py={2}
            >
               <HStack>
                    <Image src={bookmark.icon} alt='url-img'  width={40} height={40} />
                    <Box>
                        <Heading fontSize={"2xl"}>{bookmark.title}</Heading>
                        <Text fontSize={"10px"}>{bookmark.url}</Text>
                    </Box>
                </HStack> 
                <MoreVertical boxSize={5} color="gray.600" cursor="pointer" />
            </Flex>
            <Divider />
            <Box
                h={"150px"}
                py={2}
            >
                <Text fontSize={"md"}>{bookmark.description}</Text>
                <Flex gap={2}>
                    {bookmark.tags.map(tag => {
                        return (
                          <Text
                            key={tag}
                            borderRadius={"2xl"}
                            bg={"brand.bgLight"}
                            px={2} py={1}
                            fontSize={"8px"}
                          >{tag}
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
                        <Eye size={10} variant='Linear' />
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
                    <DeleteBookmarkButton id={bookmark.id} />
                </Flex>
                <Pushpin boxSize={6} color="blue.500" cursor="pointer" />
                
            </Flex>
        </GridItem>
    )
}

export default BookmarkCard