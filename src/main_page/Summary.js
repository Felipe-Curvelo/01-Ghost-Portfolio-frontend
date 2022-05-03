import React, { useContext } from 'react'

import {
    Box,
    Text,
    Flex,
    VStack,
    useColorModeValue,
  } from "@chakra-ui/react";
import { AuthContext } from '../contexts/auth';
  
function Summary({
    portfolioCost,
    portfolioValue,
    absoluteGain,
    totalGainPercent,
    btcEq,
    initialBtcEq,
    usd,
  }) {
    const boxFontSizeA = { base: '40px', md: '40px', lg: '40px'}
    const boxFontSizeB = { base: '20px', md: '22px', lg: '22px'}
    const boxColor = useColorModeValue("linear(to-r, purple.400, purple.300, purple.200)", "linear(to-r blue.900, blue.800,blue.800, blue.700, blue.600)" );
    const bgOverallColor = useColorModeValue("linear(to-r, gray.100, gray.100, white)", "linear(to-r, gray.800, gray.800, gray.700, gray.600)" );
    const fontColorUp = useColorModeValue("green.600", "green.400")
    const fontColorDown = useColorModeValue("red.600", "red.400")

    const { currencyController } = useContext(AuthContext);

    return (
        <Flex 
            justify='center'
            bgGradient={bgOverallColor} 
            roundedTop='2xl'
        >
            <Flex
                w={['90vm', '90vm', '70vm', '70vm']}
                justify='center'
                p='6'
                direction={['column', 'column', 'column', 'row']}
                gap={8} 
            >
                <Flex 
                    bgGradient={boxColor} 
                    boxShadow="dark-lg" 
                    rounded='lg'
                >
                    <Box 
                        px={['8', '8', '8', '3', '10']} 
                        py='10'                    
                    >
                        <VStack>
                            <Text fontSize={ boxFontSizeB }>
                                {Number(initialBtcEq.toFixed(6)).toLocaleString()} BTC
                            </Text>
                            {currencyController===true ?
                            <Text fontSize={ boxFontSizeA }>
                                R$ {Number((portfolioCost * usd).toFixed(2)).toLocaleString()}
                            </Text>
                            :
                            <Text fontSize={ boxFontSizeA }>
                                $ {Number(portfolioCost.toFixed(2)).toLocaleString()}
                            </Text>
                            }
                            <Text fontSize={ boxFontSizeB }>
                                Investimento Inicial
                            </Text>
                        </VStack>
                    </Box>
                </Flex>
                <Flex 
                    bgGradient={boxColor} 
                    boxShadow="dark-lg" 
                    rounded='lg'
                    alignContent='space-between'
                >
                    <Box 
                        px={['8', '8', '8', '3', '10']}  
                        py='10'
                    >
                        <VStack>
                            <Text fontSize={ boxFontSizeB } ml='20' mr='20'>
                                {Number(btcEq.toFixed(6)).toLocaleString()} BTC
                            </Text>
                            {currencyController===true ?
                            <Text fontSize={ boxFontSizeA } ml='20' mr='20'>
                                R$ {Number((portfolioValue * usd).toFixed(2)).toLocaleString()}
                            </Text>
                            :
                            <Text fontSize={ boxFontSizeA } ml='20' mr='20'>
                                $ {Number(portfolioValue.toFixed(2)).toLocaleString()}
                            </Text>
                            }
                            <Text fontSize={ boxFontSizeB } ml='20' mr='20'>
                                Total do Portfolio
                            </Text>
                        </VStack>
                    </Box>
                </Flex>
                {absoluteGain < 0 ?
                    <Flex 
                        bgGradient={boxColor} 
                        boxShadow="dark-lg" 
                        rounded='lg'
                    >
                        <Box 
                            px={['8', '8', '8', '3', '10']} 
                            py='10'                    
                        >
                            <VStack>
                                { isNaN(totalGainPercent) ?
                                <Text fontSize={ boxFontSizeB } color={fontColorDown}>
                                    0%
                                </Text>
                                :
                                <Text fontSize={ boxFontSizeB } color={fontColorDown}>
                                    {totalGainPercent.toFixed(2).replace(".", ",")} %
                                </Text>        
                                }
                                {currencyController===true ?
                                <Text fontSize={ boxFontSizeA } color={fontColorDown}>
                                    R$ {Number((absoluteGain * usd).toFixed(2)).toLocaleString()}
                                </Text>
                                :
                                <Text fontSize={ boxFontSizeA } color={fontColorDown}>
                                    $ {Number(absoluteGain.toFixed(2)).toLocaleString()}
                                </Text>
                                }
                                <Text fontSize={ boxFontSizeB }>
                                    Lucro / Prejuízo
                                </Text>
                            </VStack>
                        </Box>
                    </Flex>
                :
                    <Flex 
                    bgGradient={boxColor} 
                    boxShadow="dark-lg" 
                    rounded='lg'
                    >
                        <Box 
                            px={['8', '8', '8', '3', '10']} 
                            py='10'                    
                        >
                            <VStack>
                                { isNaN(totalGainPercent) ?
                                <Text fontSize={ boxFontSizeB } color={fontColorUp}>
                                    0%
                                </Text>
                                :
                                <Text fontSize={ boxFontSizeB } color={fontColorUp}>
                                    {totalGainPercent.toFixed(2).replace(".", ",")} %
                                </Text>        
                                }
                                {currencyController===true ?
                                <Text fontSize={ boxFontSizeA } color={fontColorUp}>
                                    R$ {Number((absoluteGain * usd).toFixed(2)).toLocaleString()}
                                </Text>
                                :
                                <Text fontSize={ boxFontSizeA } color={fontColorUp}>
                                    $ {Number(absoluteGain.toFixed(2)).toLocaleString()}
                                </Text>
                                }
                                <Text fontSize={ boxFontSizeB }>
                                    Lucro / Prejuízo
                                </Text>
                            </VStack>
                        </Box>
                    </Flex>
                }

            </Flex>
        </Flex>
    )
}
  
  export default Summary