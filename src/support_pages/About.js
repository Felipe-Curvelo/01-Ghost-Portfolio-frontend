import React from "react";
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  Badge,
  SimpleGrid,
  Image,
} from "@chakra-ui/react";

import Footer from "../main_page/Footer"
import NavBar from "../main_page/NavBar"

export default function App(){
  
  return (
    <>
    <NavBar></NavBar>
    <Flex justify='center' mt='10' mb='10' ml='10' mr='10'>
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={0}
      _after={{
        opacity: 0.25,
        pos: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        content: '" "',
      }}
      alignItems="center"
    >
      <Flex
      justify='center'
      alignItems="center"
      alignContent='center'
      alignSelf='center'
      ml='15'
      >
        <Box boxSize='md' w="full" alignItems="center">
          <Image
            src="https://i.ibb.co/tMTyRMP/Felipe-Curvelo.jpg"
            fit="cover"

            h={{ base: 64, md: "100%" }}
            bg="gray.100"
            loading="lazy"
            rounded="full"
          />
        </Box>
      </Flex>
      <Flex
        direction="column"
        alignItems="start"
        justifyContent="center"
        px={{ base: 4, lg: 10 }}
        w="full"

      >
        <Badge
          color="white"
          px={3}
          py={1}
          mb={3}
          variant="solid"
          colorScheme="brand"
          rounded="full"
        >
          Sobre o criador
        </Badge>
        <chakra.h1
          mb={6}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={useColorModeValue("brand.600", "gray.300")}
          lineHeight="shorter"
        >
          Olá, Bem-Vindo!
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
          textAlign='justify'
        >
          Meu nome é Felipe Curvelo, sou idealizador do Ghost Portfolio e invisto em criptomoedas desde 2018, sou um grande entusiasta de Bitcoin e outros protocolos,
          provendo liquidez para o mercado, transacionando via blockchain e testando novas tecnologias que surgem. 
          
        </chakra.p>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
          textAlign='justify'
        >
          Dediquei longos anos da minha vida trabalhando para grandes empresas na área de análise de dados (Big Data) e gestão de riscos, sou formado em Administração de empresas
          pela Universidade Anhembi Morumbi, já fui sócio de algumas empresas, das quais vendi minha participação para me dedicar a divulgar o mercado de criptomoedas.
        </chakra.p>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
          textAlign='justify'
        >
          Acredito que liberdade é o ativo mais importante que possuímos
          e através das criptomoedas, podemos maximizá-la, mas sem uma boa ferramenta de gestão, fica muito fácil se perder no caminho, já que são milhares de projetos, cada um com
          uma proposta mais inovadora que outra e quanto mais você compra, maior é a necessidade de ter uma maneira eficiente de controlar seus investimentos.
        </chakra.p>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
          textAlign='justify'
        >
          Pensando nisso, eu construí o Ghost Portfolio, já que não encontrei em nenhuma das diversas ferramentas que existem no mercado a proposta que apresento aqui, um ambiente onde você
          tenha um panorama de todo seu portfólio, tudo de maneira prática e visual, sem precisar compartilhar dezenas de informações, sem conectar uma carteira e com um valor justo.
        </chakra.p>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
          textAlign='justify'
        >
          Muito mais do que um lugar para monitorar o que você tem, aqui você consegue testar cenários, encontrar novas possibilidades e em breve muitas novas funcionalidades chegarão,
          tornando o Ghost ainda mais completo.
        </chakra.p>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
          textAlign='justify'
        >
          Ainda, sou criador do canal no Youtube Levemente Livre, me acompanhe nas redes sociais, os links, estão todos no rodapé do site.
        </chakra.p>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
        >
          <p>Abraços,</p>
          <p>- Felipe Curvelo</p>
                    
        </chakra.p>
      </Flex>
      
    </SimpleGrid>
    </Flex>
    <Footer></Footer>
    </>
  );
};