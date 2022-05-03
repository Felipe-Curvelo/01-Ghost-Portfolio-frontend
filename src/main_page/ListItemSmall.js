import React, {useContext, useEffect, useState } from 'react'

import {
    chakra,
    Flex,
    useColorModeValue,
    Button,
    HStack,
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Portal,
    VStack,
    Text,
  } from "@chakra-ui/react";

import { AuthContext } from '../contexts/auth';

function ListItem({ crypto, usd, deleteCoin }) {
    const fontColorUp = useColorModeValue("green.600", "green.400")
    const fontColorDown = useColorModeValue("red.600", "red.400")
    const [ fontColor, setFontColor ] = useState([]);
    const [ fontLiveColor, setFontLiveColor ] = useState([]);

    const { currencyController } = useContext(AuthContext);

    useEffect (() => {
        if (crypto["p_l"] < 0){
            setFontColor(fontColorDown)
        }
        if (crypto["p_l"] > 0){
            setFontColor(fontColorUp)
        }
    }, []);

    useEffect (() => {
        if (crypto["variation24h"] < 0){
            setFontLiveColor(fontColorDown)
        }
        if (crypto["variation24h"] > 0){
            setFontLiveColor(fontColorUp)
        }
    }, []);
    
    return (
            <>
                <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                >
                    <HStack spacing={5}>
                        <span><Image boxSize={['10px', '25px', '30px']}   src={crypto["image"]}/></span><span>{crypto["name"]}</span>
                    </HStack>
                </chakra.span>
                <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textAlign="center"
                >
                {crypto["symbol"]}
                </chakra.span>
                {currencyController === true ?
                    crypto["live_price"] > 1 ?
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign='center'
                    >
                        R$ {Number((crypto["live_price"] * usd)).toLocaleString()}
                    </chakra.span>
                    :
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign='center'
                    >
                        R$ {String(Number((crypto["live_price"] * usd))).replace(".", ",")}
                    </chakra.span>
                :
                    crypto["live_price"] > 1 ?
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign='center'
                    >
                        $ {Number(crypto["live_price"]).toLocaleString()}
                    </chakra.span>
                    :
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign='center'
                    >
                        $ {String(Number((crypto["live_price"]))).replace(".", ",")}
                    </chakra.span>
                }
                <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textAlign="center"
                    color={fontLiveColor}
                >
                {crypto["variation24h"].toFixed(2).replace(".", ",")}%
                </chakra.span>
                <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textAlign="center"
                >
                {Number(crypto["coins"].toFixed(6)).toLocaleString()}
                </chakra.span>
                {currencyController === true ?
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                    >
                    R$ {Number((crypto["total_cost"] * usd).toFixed(2)).toLocaleString()}
                    </chakra.span>
                :
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                    >
                    $ {Number((crypto["total_cost"]).toFixed(2)).toLocaleString()}
                    </chakra.span>    
                }
                {currencyController === true ?
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                    >
                    R$ {Number((crypto["total_equity"] * usd).toFixed(2)).toLocaleString()}
                    </chakra.span>
                :
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                    >
                    $ {Number((crypto["total_equity"]).toFixed(2)).toLocaleString()}
                    </chakra.span>
                }
                {currencyController === true ?
                    crypto["average_p"] > 1 ?
                        <chakra.span
                            textOverflow="ellipsis"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textAlign="center"
                        >
                            R$ {Number(crypto["average_p"] * usd).toLocaleString()}
                        </chakra.span>
                    :
                        <chakra.span
                            textOverflow="ellipsis"
                            overflow="hidden"
                            whiteSpace="nowrap"
                            textAlign="center"
                        >
                            R$ {String(Number(crypto["average_p"] * usd)).replace(".", ",")}
                        </chakra.span>
                :
                    crypto["average_p"] > 1 ?
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                    >
                        $ {Number(crypto["average_p"]).toLocaleString()}
                    </chakra.span>
                    :
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                    >
                        $ {String(Number(crypto["average_p"])).replace(".", ",")}
                    </chakra.span>
                }
                {currencyController === true ?
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                        color={fontColor}
                    >
                    R$ {Number((crypto["p_l"] * usd).toFixed(2)).toLocaleString()}
                    </chakra.span>
                :
                    <chakra.span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textAlign="center"
                        color={fontColor}
                    >
                    $ {Number(crypto["p_l"].toFixed(2)).toLocaleString()}
                    </chakra.span>
                }
                <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textAlign="center"
                    color={fontColor}
                >
                {crypto["p_l_p"].toFixed(2).replace(".", ",")}%
                </chakra.span>
                <Flex justify='center' mb='4' >
                    <Popover>
                        <PopoverTrigger>
                            <Button variant="solid" colorScheme="red" size="sm">
                                Delete
                            </Button> 
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader fontSize='15px' style={{color: fontColorDown}}>Apagar?</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <VStack spacing={3}>
                                        <Text>Você tem certeza que deseja apagar? Isso excluirá todo histórico também.</Text>
                                        <Button colorScheme="red" onClick={() =>  deleteCoin(crypto["name"])}>Deletar</Button>
                                    </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Flex>
            </>
    );

}

export default ListItem