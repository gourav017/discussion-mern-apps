import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { editQuestionApi } from "../apis/api";

const EditQuestion = ({ Question_Id, user_Id,getQuestion }) => {
  const [editques, seteditques] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  let token = localStorage.getItem("token");

  const handleChange = (e) => {
    let { name, value } = e.target;
    seteditques({
      ...editques,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    editQuestionApi({ user_Id, Question_Id, token, editques }).then(()=>{
        getQuestion()
    })
  };

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>edit your question</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormLabel>Question</FormLabel>
            <form onSubmit={handleSubmit}>
              <FormLabel>Question</FormLabel>
              <Input
                ref={initialRef}
                placeholder="question..."
                name="Question"
                onChange={handleChange}
              />
              <br />
              <br />
              <Spacer />
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem mt={15}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Tag
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Input
                      ref={initialRef}
                      placeholder="tag"
                      name="tag"
                      onChange={handleChange}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>

              <Accordion defaultIndex={[0]} allowMultiple></Accordion>

              <input
                type="submit"
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditQuestion;
