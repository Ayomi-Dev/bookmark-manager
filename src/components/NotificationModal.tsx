"use client"
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { TickCircle, CloseCircle, InfoCircle } from "iconsax-reactjs";

type NotificationModalProps = {
  show: boolean;
  type?: "success" | "error" | "info";
  message: string;
  onClose: () => void;
  autoCloseDelay?: number; // optional auto-close duration
};

const iconConfig = {
  success: {
    icon: TickCircle,
    color: "#22c55e",
  },
  error: {
    icon: CloseCircle,
    color: "red.400",
  },
  info: {
    icon: InfoCircle,
    color: "blue.400",
  },
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  show,
  type = "info",
  message,
  onClose,
  autoCloseDelay = 5000,
}) => {
  const { icon: Icon, color } = iconConfig[type];
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.100");

  // Auto close for success/info after delay
  useEffect(() => {
    if (show && (type === "success" || type === "info")) {
      const timer = setTimeout(onClose, autoCloseDelay);
      return () => clearTimeout(timer);
    }
  }, [show, type, autoCloseDelay, onClose]);

  return (
    <Modal isOpen={show} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(6px)" bg="blackAlpha.500" />
      <ModalContent
        bg={bg}
        borderRadius="2xl"
        boxShadow="xl"
        p={6}
        maxW="sm"
        textAlign="center"
      >
        <ModalBody>
          <Flex justify="center" mb={4}>
            <Icon size={48} color={color} variant="Bold" />
          </Flex>
          <Text fontSize="lg" fontWeight="medium" color={textColor}>
            {message}
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            colorScheme="blue"
            onClick={onClose}
            px={6}
            borderRadius="lg"
          >
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
