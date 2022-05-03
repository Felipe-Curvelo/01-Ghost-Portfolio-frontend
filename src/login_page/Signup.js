import React, { useState }  from 'react';
import axios from 'axios';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    HStack,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';

  import { Link, useNavigate } from 'react-router-dom';
  
  export default function SignupCard() {
    const [username, setUsername ] = useState("");
    const [usersurname, setUsersurname ] = useState("");
    const [email1, setEmail1 ] = useState("");
    const [email2, setEmail2 ] = useState("");
    const [password1, setPassword1 ] = useState("");
    const [password2, setPassword2 ] = useState("");
    const [loadingText, setLoadingText ] = useState({ buttonText: 'Criar Conta'});
    const { buttonText } = loadingText;
    const toast = useToast();
    const navigate = useNavigate();

    const createNewAccount = () => {
      setLoadingText({ buttonText: 'Enviando...'})
      const options = {
          url: `${process.env.REACT_APP_BASE_URL}/sign-up`,
          method: 'POST',
          headers: { 
              "Content-Type": "application/json",
          },
          data: {
            username: username,
            usersurname: usersurname,
            email1: email1,
            email2: email2,
            password1: password1,
            password2: password2,
          }
      };
      axios(options)
      .then(response => {
        console.log('Conta Criada com Sucesso!')
        setUsername('')
        setUsersurname('')
        setEmail1('')
        setEmail2('')
        setPassword1('')
        setPassword2('')
        toast({
          title: 'Conta Criada com Sucesso! Pode logar agora.',
          description: response.data.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
        setLoadingText({ buttonText: 'Criar Conta'})
        navigate("/login")
      })
      .catch(error => {
        console.log(error.status)
        toast({
          title: 'Não foi possível criar sua conta, revise seus dados.',
          description: error.response.data.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        setLoadingText({ buttonText: 'Criar Conta'})
      })
  };

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Crie uma conta
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              para ter acesso ao conteúdo
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Nome</FormLabel>
                    <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    type="text" 
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Sobrenome</FormLabel>
                    <Input
                    value={usersurname}
                    onChange={(e) => setUsersurname(e.target.value)}
                    type="text" 
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email1" isRequired>
                <FormLabel>Endereço de email</FormLabel>
                <Input
                value={email1}
                onChange={(e) => setEmail1(e.target.value)} 
                type="email" 
                />
              </FormControl>
              <FormControl id="email2" isRequired>
                <FormLabel>Confirme o email</FormLabel>
                <Input
                value={email2}
                onChange={(e) => setEmail2(e.target.value)} 
                type="email" 
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Senha (8 dígitos no mínimo)</FormLabel>
                  <Input
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}  
                    type='password'
                  />
              </FormControl>
              <FormControl id="confirm_password" isRequired>
                <FormLabel>Senha (8 dígitos no mínimo)</FormLabel>
                  <Input
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}  
                    type='password'
                  />
              </FormControl>
              <Stack spacing={10} pt={2}>
                {buttonText === "Criar Conta"  ?
                  <Button
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500'
                    }}
                    onClick={createNewAccount}
                  >
                  {buttonText}
                  </Button> :
                  <Button
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500'
                    }}
                    isDisabled
                    onClick={createNewAccount}
                    >
                    {buttonText}
                    </Button>
                }                
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Já tem uma conta? <Link to="/login" style={{ color: 'cyan', textDecorationLine: 'underline' }}>Faça seu Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }