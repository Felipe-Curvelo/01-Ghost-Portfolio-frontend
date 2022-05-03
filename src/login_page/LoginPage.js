import React, {useContext } from 'react';

import { Link } from 'react-router-dom';

import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    HStack,
    Flex,
  } from '@chakra-ui/react';

import { AuthContext } from '../contexts/auth';
import Footer from "../main_page/Footer"


const LoginPage = () => {
    const { setEmail, setPassword, email, password, handleLogin, loading } = useContext(AuthContext);

    return (
        <>
        <Flex
        justify='center'
        alignSelf='center' 
        style={{
            backgroundImage: `url("https://i.ibb.co/0qfvV6w/Ghost-Bgf.png")`,
            width: '100vw',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
          }}
        >
            <Box position={'relative'}>
                <Container
                    as={SimpleGrid}
                    maxW={'7xl'}
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 10, lg: 32 }}
                    py={{ base: 10, sm: 20, lg: 32 }}>
                    <Stack spacing={{ base: 10, md: 20 }}>
                        <Box 
                        style={{
                            backgroundColor: 'rgba(40, 15, 60, 0.8)'
                        }}
                        boxShadow="dark-lg" 
                        rounded='lg'
                        >  
                            <Heading
                                bgGradient={"linear(to-r, purple.100, purple.200, purple.200, gray.100, white)"}
                                bgClip="text"
                                lineHeight={1.1}
                                fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
                                mr='5'
                                ml='5'
                            >
                                Ghost Portfolio
                            </Heading>
                        </Box>
                        <Box
                            style={{
                                backgroundColor: 'rgba(250, 250, 250, 0.8)'
                            }}
                            boxShadow="dark-lg" 
                            rounded='lg'
                        > 
                                <Heading color={'gray.800'}  fontSize={{ base: '15', sm: '25' }}  mx='10' mt='10' textAlign='justify'>
                                    O Ghost te ajuda onde você mais precisa!
                                </Heading>
                                <Text color={'gray.600'}  fontSize={{ base: '10', sm: '20' }}  mx='10' mt='2' mb='10' textAlign='justify'>
                                    Analise o desempenho de todas as suas criptomoedas em um só lugar. Seja a melhor versão de você, através 
                                    de uma ferramenta que possibilita uma visão panorâmica da sua carteira, de uma maneira única e prazerosa.
                                </Text>
                        </Box>
                    </Stack>
                    <Stack
                        bg={'gray.50'}
                        rounded={'xl'}
                        p={{ base: 4, sm: 6, md: 8 }}
                        spacing={{ base: 8 }}
                        maxW={{ lg: 'lg' }}>
                    <Stack spacing={4}>
                        <Heading
                            color={'gray.800'}
                            lineHeight={1.1}
                            fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                        >
                            Faça seu login:
                        </Heading>
                        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }} textAlign='justify'>
                            Tenha acesso ao Ghost Portfolio, faça seu cadastro ou entre com as suas credenciais.
                        </Text>
                    </Stack>
                        <Box as={'form'} mt={10}>
                            <Stack spacing={4}>
                            <Input
                                type={'email'}
                                placeholder="email"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                color: 'gray.500',
                                }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type={'password'}
                                placeholder="senha"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                color: 'gray.500',
                                }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            </Stack>
                            <Button
                            fontFamily={'heading'}
                            mt={8}
                            w={'full'}
                            bgGradient="linear(to-r, red.400,pink.400)"
                            color={'white'}
                            _hover={{
                                bgGradient: 'linear(to-r, red.400,pink.400)',
                                boxShadow: 'xl',
                            }}
                            onClick={handleLogin}
                            isDisabled={loading}
                            >
                            {loading ? "Processando..." : "Entrar"}
                            </Button>
                            <HStack justify={'center'} mt={8} >
                            <Box>
                                <Link style={{ color: 'blue', textDecorationLine: 'underline', fontSize: '15px' }}
                                    to="/forgotpassword">
                                    Esqueceu sua senha?
                                </Link>
                            </Box>
                            <Box >
                                <Text color='gray.500' style={{ fontSize: '15px' }}>|</Text>
                            </Box>
                            <Box>
                                <Link style={{ color: 'blue', textDecorationLine: 'underline', fontSize: '15px' }}
                                    to="/signup">
                                <Text >Crie uma conta</Text>
                                </Link>
                            </Box>
                            </HStack>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Flex>
        <Footer></Footer>
        </>
      );
}

export default LoginPage
