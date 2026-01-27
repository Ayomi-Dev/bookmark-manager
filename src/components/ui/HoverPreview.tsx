import { motion } from 'framer-motion';
import { Box, Text } from '@chakra-ui/react';
import { Bookmark } from '@/context/BookmarkContext';
import { FC } from 'react';
import Image from 'next/image';

const MotionBox = motion.create(Box); //motion effects for hover preview
type PreviewProp = {
    bookmark: Bookmark;
    handleVisit: () => void
    isHovering: boolean;
}

export const HoverPreview: FC<PreviewProp> = ({ bookmark, handleVisit, isHovering }) => {
    return(
        <MotionBox
            position="absolute"
            top={"50%"}
            left={"50%"}
            width="250px"
            p={3}
            borderRadius="md"
            bg="white"
            _dark={{ bg: "gray.700" }}
            boxShadow="lg"
            zIndex={10}
            // pointerEvents="none"
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
            <Text 
                fontSize="11px" 
                color="gray.500" 
                // noOfLines={1}
            >
              {bookmark.url}
            </Text>
            {bookmark.icon && (
                <Box mt={2}>
                  <Image
                    alt={bookmark.title}
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
        </MotionBox>
    )
}