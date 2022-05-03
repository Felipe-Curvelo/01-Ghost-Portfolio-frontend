import React, { useEffect, useState } from "react";
import {
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  chakra,
  useColorModeValue,
  Flex,
  HStack,
  Spinner,
  TableContainer,
} from "@chakra-ui/react";

import TransactionItem from "./TransactionItem";
import { getTransactions } from "../services/api";
import NavBar from "./NavBar";
import Footer from "./Footer";



export default function TransactionsTable() {
  const bg2 = useColorModeValue("gray.100", "gray.700");
  const [ loading, setLoading ] = useState(false);
  const [transactions, setTransactions] = useState([]);


  const loadTransactions = async () => {
    setLoading(true)
    const response = await getTransactions();
    setTransactions(response.data)
    setLoading(false)
  }

  useEffect (() => {
    (async () => await loadTransactions())();
  }, []);

  if (loading){
    return (
    <VStack>
        <HStack mt="300px">
        <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        />

        </HStack>
    </VStack>
    )
}

  return (
    <> 
      <NavBar></NavBar>
      <VStack spacing={3} mt={10} >
        <chakra.h1
            textAlign={'center'}
            fontSize={'4xl'}
            fontWeight={'bold'}>
            Histórico de Transações
        </chakra.h1>
        <Flex
          
          bg={bg2}
          p={50}
          alignItems="center"
          justifyContent="center"
        >
          <TableContainer maxWidth='100%'>
            <Table w="full" variant="striped" colorScheme="blackAlpha" width={5} bg={bg2}>
              <TableCaption mt={10}>Essas são todas as transações efetuadas na plataforma</TableCaption>
              <Thead spacingy={3}
                columns={{ base: 1, md: 3 }}
                textTransform="uppercase"
                bg={bg2}
                color={"gray.500"}
                py={{ base: 1, md: 4 }}
                px={{ base: 2, md: 10 }}>
                <Tr >
                  <Th>Criptomoeda</Th>
                  <Th>Tipo de Transação</Th>
                  <Th>Valor</Th>
                  <Th>Preço de Compra</Th>
                  <Th>Preço de Venda</Th>
                  <Th>Qtd de Criptomoedas</Th>
                  <Th>Data da Transação</Th>
                  <Th>Lucro / Prejuízo</Th>
                </Tr>
              </Thead>
              <Tbody fontSize='15px' >
                {transactions.map((tran, index) => {
                  return (
                    <TransactionItem key={index} transaction={tran}></TransactionItem>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </VStack>
      <Footer></Footer>
    </>
  );
}