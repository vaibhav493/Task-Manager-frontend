import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function PopUpModel({ children, isOpen, onClose, onOpen }) {
  return (
    <>
      <Modal motionPreset="slideInBottom" onClose={onClose} isOpen={isOpen}>
        <ModalOverlay
          bg="blackAlpha.200"
          backdropFilter="blur(3px) hue-rotate(60deg)"
        />

        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  );
}


