import React, { useEffect, useState } from "react";

import {
  Flex,
  useColorModeValue,
  Stack,
  SimpleGrid,
  useMediaQuery,
  Button,
} from "@chakra-ui/react";
import ListItemLarge from "./ListItemLarge";
import ListItemSmall from "./ListItemSmall";

import { BiSort } from "react-icons/bi"

function ListTable({ rollups, usd, deleteCoin, onClose}) {

  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("purple.300", "blue.700");
  const bgOverallColor = useColorModeValue("linear(to-r, gray.100, gray.100, white)", "linear(to-r, gray.800, gray.800, gray.700, gray.600)" );
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
  const textColorHeader= useColorModeValue('black', 'white')
  const [ order, setOrder] = useState("ASC");
  const [data, setData] = useState(rollups);

  useEffect(() =>{
      setData(rollups)
  },[rollups])

  const sorting = (col) => {
      if (order === "ASC"){
          const sorted = [...rollups].sort((a, b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
          );
          setData(sorted)
          setOrder("DSC")
      }
      if (order === "DSC"){
        const sorted = [...rollups].sort((a, b) =>
          a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted)
        setOrder("ASC")
    }
  }

  const algorithmSorting = (col) => {
    if (order === "ASC"){
        const sorted = [...rollups].sort((a,b) =>
        a[col] > b[col] ? 1 : -1
        );
        setData(sorted)
        setOrder("DSC")
    }
    if (order === "DSC"){
        const sorted = [...rollups].sort((a,b) =>
        a[col] < b[col] ? 1 : -1
        );
        setData(sorted)
        setOrder("ASC")
    }
  }


 
  return (
    <>
    {isLargerThan1280 ? 
        (<Flex 
            justify='center' 
            bgGradient={bgOverallColor}
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                mt='10'
                ml='5'
                mr='5'
                mb='20'
                shadow="lg"
                rounded='lg'
                w='90%'
            >
                <Stack
                    direction={{ base: "column" }}
                    w="full"
                    bg={{ md: bg }}
                    shadow="lg"
                >
                    <Flex
                        bg={dataColor}
                    >
                        <SimpleGrid
                            columns={{ base: 1, md: 11 }}
                            w={['70vm', '70vm', '80vm', 'full']}
                            bg={bg2}
                            py='5'
                            px='13'
                        >
                            <span><Button onClick={() =>sorting("name")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>Criptomoeda</Button></span>
                            <span><Button variant='ghost' _hover={false} _focus={false} textTransform="uppercase" fontWeight="bold" fontSize='15'>Símbolo</Button></span>
                            <span><Button onClick={() =>algorithmSorting("live_price")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>Preço Atual</Button></span>
                            <span><Button onClick={() =>algorithmSorting("variation24h")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>24h%</Button></span>
                            <span><Button onClick={() =>algorithmSorting("coins")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>Qtd de Moeda</Button></span>
                            <span><Button onClick={() =>algorithmSorting("total_cost")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>Valor Inicial</Button></span>
                            <span><Button onClick={() =>algorithmSorting("total_equity")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>Valor Atual</Button></span>
                            <span><Button onClick={() =>algorithmSorting("average_p")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>Preço Médio</Button></span>
                            <span><Button onClick={() =>algorithmSorting("p_l")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'>Lucro/Prejuízo</Button></span>
                            <span><Button onClick={() =>algorithmSorting("p_l_p")} variant='ghost' _hover={false} _focus={false} rightIcon={<BiSort />} textTransform="uppercase" fontWeight="bold" fontSize='15'> L/P(%)</Button></span>
                        </SimpleGrid>
                    </Flex>
                    <Flex
                        direction='column'
                        bg={dataColor}
                    >
                        <SimpleGrid
                            spacingY={3}
                            columns={{ base: 1, md: 11 }}
                            w="full"
                            py={0}
                            px={10}
                            fontSize={{ base:'30', md:"20", lg:"20"}}
                            mb="5"
                            
                        >
                        {data.map((coin, index) => {
                            return (
                                <ListItemLarge key={index} crypto={coin} usd={usd} deleteCoin={deleteCoin} onClose={onClose}></ListItemLarge>
                            );        
                        })}
                        </SimpleGrid>
                    </Flex>
                </Stack>
            </Flex>
        </Flex>)
    : 
        (<Flex 
            justify='center' 
            bgGradient={bgOverallColor}
        >
            <Flex
                alignItems="center"
                justifyContent="center"
                
                ml='10'
                mr='10'
                mb='20'
                rounded='lg'
            >
                <Stack
                    direction={{ base: "column" }}
                    w="full"
                    bg={{ md: bg }}
                >
                    {rollups.map((coin, index) => {
                        return (
                            <Flex
                            direction={{ base: "row", md: "row" }}
                            bg={dataColor}
                            key={index}
                            borderColor="black"
                            >
                                <SimpleGrid
                                    spacingY={3}
                                    columns={{ base: 1, md: 1 }}
                                    w={{ base: 300, md: 300 }}
                                    textTransform="uppercase"
                                    bg={bg2}
                                    color={textColorHeader}
                                    py={{ base: 1, md: 1 }}
                                    px={{ base: 3, md: 3 }}
                                    fontSize='md'
                                >
                                    <span>Criptomoeda</span>
                                    <span>Símbolo</span>
                                    <span>Preço Atual</span>
                                    <span>24h%</span>
                                    <span>Qtd de Moeda</span>
                                    <span>Investimento Inicial</span>
                                    <span>Investimento Atual</span>
                                    <span>Preço Médio</span>
                                    <span>Lucro/Prejuízo</span>
                                    <span>Lucro / Prejuízo (%)</span>
                                    <span>Apagar</span>
                                </SimpleGrid>
                                <SimpleGrid
                                    columns={{ base: 1, md: 1 }}
                                    textAlign='right'
                                    fontSize='24'
                                    spacing='4'
                                    py={{ base: 1, md: 1 }}
                                    px={{ base: 3, md: 3 }}
                                >
                                    <ListItemSmall key={index} crypto={coin} usd={usd} deleteCoin={deleteCoin}></ListItemSmall>
                                </SimpleGrid>
                            </Flex>
                        );
                    })}
                </Stack>
            </Flex>
        </Flex>
    
    )}
        </>
  )}

  export default ListTable