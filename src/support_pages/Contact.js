import React, { useState } from 'react';
import NavBar from '../main_page/NavBar';
import Footer from '../main_page/Footer';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import {
  MdOutlineEmail,
  MdOutlineSpeakerNotes,
} from 'react-icons/md';

import {  BsPerson } from 'react-icons/bs';
import axios from 'axios';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState('');
  const toast = useToast();

  const handleSendEmail = () => {
    setLoading(true)
    const options = {
      url: `${process.env.REACT_APP_BASE_URL}/contact-mail`,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        email: email,
        name: name,
        subject: subject,
        message: message
      }
    };

    axios(options)
    .then(response => {
      console.log(response.status);
      toast({
        title: 'Email enviado!',
        description: 'Em breve retornaremos seu contato!',
        status: 'success',
        duration: 9000,
        isClosable: true,
        });
        setEmail('');
        setName('');
        setSubject('');
        setMessage('');
        setLoading(false);
    })
    .catch (error => {
      console.error(error);
      toast({
          title: 'Não foi possível enviar a mensagem',
          description: "O servidor pode estar indisponível, tente mais tarde",
          status: 'error',
          duration: 9000,
          isClosable: true,
          });
      setLoading(false)
      });
  }


  return (
    <>
    <NavBar></NavBar>
    <Container  maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg='purple.800'
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contato</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.200">
                    <p>Envie suas críticas, sugestões</p>
                    <p>e elogios, preenchendo o formulário.</p>
                    <p>Responderemos dentro em breve.</p>
                  </Text>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Seu nome</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input 
                          type="text" 
                          size="md"
                          value={name}
                          onChange={(e) => setName(e.target.value)} 
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input 
                          type="text" 
                          size="md"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Assunto</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineSpeakerNotes color="gray.800" />}
                          />
                          <Input 
                          type="text" 
                          size="md" 
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel>Mensagem</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          placeholder="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="#0D74FF"
                          color="white"
                          _hover={{}}
                          onClick={handleSendEmail}
                          disabled={loading}
                          >
                          {loading ? "Enviando..." : "Enviar"}  
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
    <Footer></Footer>
    </>
  );
}