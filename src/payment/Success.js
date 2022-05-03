import { VStack, Text, Button } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

const Success = () => {
  const {logout} = useContext(AuthContext)


    return (
      <VStack>
        <Text mt='20' fontSize='6xl'>Obrigado pela sua compra!</Text>
        <Text fontSize='xl'>Será preciso logar novamente para ativar seu plano.</Text>
          <Button colorScheme='blue' onClick={logout}>Clique aqui para fazer o login</Button>
      </VStack>
    );
  };
  
  export default Success;