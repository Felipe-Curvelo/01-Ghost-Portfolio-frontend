import React, {useEffect, useState, useContext } from 'react';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';

import axios from 'axios';

import { Link } from "react-router-dom";
import { AuthContext } from '../contexts/auth';


export default function UserProfileEdit(){
  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");
  const [loadingText, setLoadingText ] = useState({ buttonText: 'Editar'});
  const { buttonText } = loadingText;
  const { plan, subscription } = useContext(AuthContext)
  const toast = useToast();

  const toogleEdit = () => {
    setLoadingText({ buttonText: 'Salvar Alterações'})
  }

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    if(buttonText === "Editar"){

      setEmail(user.user.email)
    }

  }, [])

  

  const editAccountInfo = () => {
      const token = localStorage.getItem('token');


      
      const options = {
          url: `${process.env.REACT_APP_BASE_URL}/edit_info`,
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
          },
          data: {
            password: password,
          }
      };
      axios(options)
      .then(response => {
        console.log('Sucesso!')
        toast({
          title: 'Dados atualizados com sucesso!',
          description: response.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setLoadingText({ buttonText: 'Editar'})

      })
      .catch(error => {
        console.log(error.status)
        toast({
          title: 'Dados errados ou faltantes, não foi possível atualizar as informações',
          description: error.response.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setLoadingText({ buttonText: 'Editar'})
      })
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Editar Informações
        </Heading>
        {buttonText === "Salvar Alterações" ?
          <>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder={email}
              _placeholder={{ color: 'gray.500' }}
              type="email"
              isDisabled={true}
            />
          </FormControl >
          <FormControl id="password" isRequired>
            <FormLabel>Senha</FormLabel>
            <Input
              placeholder="senha"
              _placeholder={{ color: 'gray.500' }}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {subscription === true ?
            <FormControl id="account" _readOnly={true}>
              <FormLabel>Plano atual</FormLabel>
              <InputGroup>
                <Input
                  placeholder={plan}
                  _placeholder={{ color: 'gray.300' }}
                  type="text"
                  isDisabled
                />
                <InputRightElement width='4.5rem'>
              </InputRightElement>
              </InputGroup>
            </FormControl>
          :
            <FormControl id="account" _readOnly={true}>
              <FormLabel>Plano atual</FormLabel>
                <Link to="/subscription">
                  <InputGroup>
                    <Input
                      placeholder="Teste Grátis"
                      _placeholder={{ color: 'gray.300' }}
                      type="text"
                      isDisabled
                    />
                    <InputRightElement width='4.5rem'>
                      <Button colorScheme="yellow" >
                        Assinar
                      </Button>
                  </InputRightElement>
                  </InputGroup>
                </Link>
            </FormControl>
          }
          <Stack spacing={6} direction={['column', 'row']}>
            <Link to="/">
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}>
                Cancelar
              </Button>
            </Link>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={editAccountInfo}
              >
              {buttonText}
            </Button>
          </Stack>
          </>
        :
          <>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              placeholder={email}
              _placeholder={{ color: 'gray.300' }}
              type="email"
              value={email}
              isDisabled
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input
              placeholder="senha"
              _placeholder={{ color: 'gray.300' }}
              type="password"
              isDisabled
            />
          </FormControl>
          {subscription === true ?
            <FormControl id="account" _readOnly={true}>
              <FormLabel>Plano atual</FormLabel>
              <InputGroup>
                <Input
                  placeholder={plan}
                  _placeholder={{ color: 'gray.300' }}
                  type="text"
                  isDisabled
                />
                <InputRightElement width='4.5rem'>
              </InputRightElement>
              </InputGroup>
            </FormControl>
          :
            <FormControl id="account" _readOnly={true}>
              <FormLabel>Plano atual</FormLabel>
                <Link to="/subscription">
                  <InputGroup>
                    <Input
                      placeholder="Teste Grátis"
                      _placeholder={{ color: 'gray.300' }}
                      type="text"
                      isDisabled
                    />
                    <InputRightElement width='4.5rem'>
                      <Button colorScheme="yellow" >
                        Assinar
                      </Button>
                  </InputRightElement>
                  </InputGroup>
                </Link>
            </FormControl>
          }
          <Stack spacing={6} direction={['column', 'row']}>
            <Link to="/">
              <Button
                bg={'red.400'}
                color={'white'}
                w="full"
                _hover={{
                  bg: 'red.500',
                }}>
                Cancelar
              </Button>
            </Link>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              onClick={toogleEdit}
              >
              {buttonText}
            </Button>
          </Stack>
          </>
        }
      </Stack>
    </Flex>
  );
}