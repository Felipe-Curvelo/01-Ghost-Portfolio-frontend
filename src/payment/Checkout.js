import {loadStripe} from '@stripe/stripe-js';
import { useState, useContext } from 'react';


import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  useToast,
} from '@chakra-ui/react';


import Footer from "../main_page/Footer"

import { FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../contexts/auth';

let stripePromise 

const getStripe = () => {
 if (!stripePromise){
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
    
  }
  return stripePromise;
}

const Checkout = () => {
  const [stripeError, setStripeError] = useState(null);
  const { expiredUser, navigate } = useContext(AuthContext);
  const [ loading, setLoading] = useState(false)
  const toast = useToast();

  const redirectToCheckout = async () => {
    try{
        setLoading(true);
        const token = localStorage.getItem('token');

        if(!token){
              toast({
              title: 'Você precisa estar logado para conseguir assinar!',
              description: 'Entre com seus dados ou crie uma conta para assinar o Ghost Portfolio.',
              status: 'error',
              duration: 9000,
              isClosable: true,
              });
              navigate('/login')
        }
        console.log("redirectToCheckout");
        const stripe = await getStripe();
        const url = `${process.env.REACT_APP_BASE_URL}/create-checkout-session`;
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        fetch(url, options)
        .then((result) => { return result.json(); })
        .then((data) => {
          console.log(data);
          // Redirect to Stripe Checkout
          return stripe.redirectToCheckout({sessionId: data.sessionId})
        })
        .then((res) => {
          console.log(res);
          setLoading(false)
        });
    } catch(error){
      setStripeError(error.message);
      setLoading(false)
    }
    

  };

  const redirectToCheckoutAnualPlan = async () => {
    try {
          setLoading(true)
          const token = localStorage.getItem('token');
          if(!token){
            toast({
            title: 'Você precisa estar logado para conseguir assinar!',
            description: 'Entre com seus dados ou crie uma conta para assinar o Ghost Portfolio.',
            status: 'error',
            duration: 9000,
            isClosable: true,
            });
            navigate('/login')
          }   
          console.log("redirectToCheckout");
          const stripe = await getStripe();
          console.log(stripe)
          const url = `${process.env.REACT_APP_BASE_URL}/create-checkout-session-anualplan`;
          const options = {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          fetch(url, options)
          .then((result) => { return result.json(); })
          .then((data) => {
            console.log(data.sessionId);
            // Redirect to Stripe Checkout
            return stripe.redirectToCheckout({sessionId: data.sessionId})
          })
          .then((res) => {
            console.log(res);
            setLoading(false)
          });
    } catch (error) {
          setStripeError(error.message);
          setLoading(false)
    }
    
  }

  if (stripeError) alert(stripeError);

  return (
    <>
      <Box py={12}>
        <VStack spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Escolha o Plano que se encaixa para suas necessidades
          </Heading>
          {expiredUser ?
            <Text fontSize="lg" color={'gray.500'}>
              Seu tempo de degustação grátis de 15 dias acabou! Mas não se preocupe, você não precisa ficar sem o Ghost portfolio. Escolha um dos planos abaixo e continue usando!
            </Text>
            :
            <Text fontSize="lg" color={'gray.500'}>
              Teste gratuito por 15 dias ou escolha algum  dos planos abaixo. Cancele a qualquer momento.
            </Text>
          }
        </VStack>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          textAlign="center"
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}>
          <Box
            mb={4}
            shadow="base"
            borderWidth="1px"
            alignSelf={{ base: 'center', lg: 'flex-start' }}
            borderColor={useColorModeValue('gray.200', 'gray.500')}
            borderRadius={'xl'}>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Gratuito
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  R$
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  0
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /mês
                </Text>
              </HStack>
              <Text fontSize="xl" color="gray.100">
                  Esteja no controle da sua carteira
              </Text>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                    15 dias gratuitos
                </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                    Análise gráfica da sua carteira
                  </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                    Inclusão ilimitada de criptomoedas
                  </ListItem>
                <ListItem>
                  <ListIcon as={FaCheckCircle} color="green.500" />
                    Informações em tempo real do seu portfólio
                </ListItem>
              </List>

            </VStack>
          </Box>

          <Box
              mb={4}
              shadow="base"
              borderWidth="1px"
              alignSelf={{ base: 'center', lg: 'flex-start' }}
              borderColor={useColorModeValue('gray.200', 'gray.500')}
              borderRadius={'xl'}>
            <Box position="relative">
              <Box
                position="absolute"
                top="-16px"
                left="50%"
                style={{ transform: 'translate(-50%)' }}>
                <Text
                  textTransform="uppercase"
                  bg={useColorModeValue('red.300', 'red.700')}
                  px={3}
                  py={1}
                  color={useColorModeValue('gray.900', 'gray.300')}
                  fontSize="sm"
                  fontWeight="600"
                  rounded="xl">
                  20% DE DESCONTO
                </Text>
              </Box>
              <Box py={4} px={12}>
                <Text fontWeight="500" fontSize="2xl">
                  Anual
                </Text>
                <Text fontSize="xl" as='s'>
                    R$ 179,88
                </Text>
                <HStack justifyContent="center">
                  <Text fontSize="3xl" fontWeight="600">
                    R$
                  </Text>
                  <Text fontSize="5xl" fontWeight="900">
                    143,99
                  </Text>
                  <Text fontSize="3xl" color="gray.500">
                    /ano
                  </Text>
                </HStack>
                <Text fontSize="xl" color="gray.100">
                  Mantenha seus rendimentos no caminho certo
              </Text>
              </Box>
              <VStack
                bg={useColorModeValue('gray.50', 'gray.700')}
                py={4}
                borderBottomRadius={'xl'}>
                <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Acesso antecipado a novas funcionalidades
                    </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Análise gráfica da sua carteira
                    </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Inclusão ilimitada de criptomoedas
                    </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Informações em tempo real do seu portfólio
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Acesso ao grupo de sugestões e melhorias
                  </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Suporte via email
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Descontos em produtos futuros
                    </ListItem>                
                </List>
                <Box w="80%" pt={7}>
                  <Button w="full" colorScheme="red" onClick={redirectToCheckoutAnualPlan} isDisabled={loading}>
                    {loading ? "Processando..." : "Assinar" }
                  </Button>
                </Box>
              </VStack>
            </Box>
          </Box>
          <Box
              mb={4}
              shadow="base"
              borderWidth="1px"
              alignSelf={{ base: 'center', lg: 'flex-start' }}
              borderColor={useColorModeValue('gray.200', 'gray.500')}
              borderRadius={'xl'}>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Mensal
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  R$
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  14,99
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /mês
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12}>
              <List spacing={3} textAlign="start" px={12}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Acesso antecipado a novas funcionalidades
                    </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Análise gráfica da sua carteira
                    </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Inclusão ilimitada de criptomoedas
                    </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Informações em tempo real do seu portfólio
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.500" />
                      Acesso ao grupo de sugestões e melhorias
                  </ListItem>
                    <ListItem>
                      <ListIcon as={FaCheckCircle} color="green.500" />
                      Suporte via email
                    </ListItem>
                </List>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red" variant="outline" onClick={redirectToCheckout} isDisabled={loading}>
                  {loading ? "Processando..." : "Assinar" }
                </Button>
              </Box>
            </VStack>
          </Box>
        </Stack>
      </Box>
      <Footer></Footer>
    </>
    );

}

export default Checkout;