import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import axios from 'axios';
  
  import { useNavigate } from 'react-router-dom';
  
  
  const ResetPasswordForm = () => {
    const [ newPassword, setNewPassword ] = useState('');
    const [ checkNewPassword, setCheckNewPassword] = useState('');
    
    const toast = useToast();
    const navigate = useNavigate();
  
    const token = new URL(window.location.href).hash.split('&').filter(function(el) { if(el.match('access_token') !== null) return true; })[0].split('=')[1];
  
  
    const handleReset = async () => {


        const options = {
            url: `${process.env.REACT_APP_BASE_URL}/reset_password/${token}`,
            method: 'POST',
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            data: {
                newpassword: newPassword,
                check_newpassword: checkNewPassword,

            }
        };
        axios(options)
        .then(response => {
        toast({
        title: 'Senha alterada com sucesso!',
        description: 'Sua senha foi alterada! Utilize-a para logar em sua conta.',
        status: 'success',
        duration: 9000,
        isClosable: true,
        });
        setNewPassword('')
        setCheckNewPassword('')
        navigate('/login')
        })
        .catch (error => {
            console.error(error);
            toast({
                title: 'Não foi possível alterar sua senha!',
                description: "Verifique as informações e se o erro persistir, peça um novo reset de senha.",
                status: 'error',
                duration: 9000,
                isClosable: true,
                });
        });
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
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Digite uma nova senha:
          </Heading>
          <FormControl id="password" isRequired>
            <FormLabel>Senha (8 dígitos no mínimo)</FormLabel>
            <Input 
            type='password' 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormControl>
          <FormControl id="confirm_password" isRequired>
            <FormLabel>Confirme a senha</FormLabel>
            <Input 
            type='password' 
            value={checkNewPassword} 
            onChange={(e) => setCheckNewPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500'
              }}
              onClick={handleReset}
              >
              Alterar
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
  
  export default ResetPasswordForm