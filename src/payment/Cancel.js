import { VStack, Text, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";


const Cancel = () => {


    return (
      <VStack>
        <Text mt='20' fontSize='6xl' color='red'>Operação cancelada!</Text>
        <Text fontSize='xl'>Compra não concluída! Clique no botão abaixo para ser redirecionado para seu portfólio</Text>
        <Link to="/">
          <Button colorScheme='blue'>Sair</Button>
        </Link>
      </VStack>
    );
  };
  
  export default Cancel;