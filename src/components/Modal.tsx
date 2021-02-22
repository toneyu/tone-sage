import {
  HStack,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { ModalData } from '../@types/modal';
import ModalButton from './ModalButton';

const Modal: React.FunctionComponent<{
  modal: ModalData;
  onModalClose: (modalId: string) => void;
}> = ({ modal, onModalClose }) => {
  const closeModal = useCallback(() => onModalClose(modal.id), [modal.id, onModalClose]);

  return (
    <ChakraModal
      isOpen
      onClose={closeModal}
      closeOnEsc={modal.closeOnEsc}
      closeOnOverlayClick={modal.closeOnOverlayClick}
    >
      <ModalOverlay />
      <ModalContent>
        {typeof (modal.title as string) === 'string' ? (
          // TODO: Add adjustable header color support
          <ModalHeader>{modal.title}</ModalHeader>
        ) : (
          modal.title
        )}
        <ModalCloseButton />
        <ModalBody>{modal.description}</ModalBody>

        <ModalFooter>
          <HStack>
            {modal.modalButtons.map((actionButton) => (
              <ModalButton
                actionButton={actionButton}
                key={actionButton.key}
                modalId={modal.id}
                closeOnSelection={modal.closeOnSelection}
              />
            ))}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );

  // return (
  //   <ChakraModal
  //     onEsc={modal.closeOnEsc ? closeModal : undefined}
  //     onClickOutside={modal.closeOnOverlayClick ? closeModal : undefined}
  //     position="top"
  //   >
  //     <Box pad="medium" round overflow="auto" data-cy={modal.dataCyIdentifier}>
  //       {typeof (modal.title as string) === 'string' ? (
  //         <Heading color="red" level="3">
  //           {modal.title}
  //         </Heading>
  //       ) : (
  //         modal.title
  //       )}
  //       {modal.description}
  //       <Box direction="row" margin={{ top: 'small' }} gap="small">
  //         {modal.modalButtons.map((actionButton) => (
  //           <ActionButton
  //             actionButton={actionButton}
  //             key={actionButton.key}
  //             modalId={modal.id}
  //           />
  //         ))}
  //       </Box>
  //     </Box>
  //   </ChakraModal>
  // );
};

export default Modal;
