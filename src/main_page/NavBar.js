import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import {
    chakra,
    Flex,
    HStack,
    useColorModeValue,
    Box,
    useDisclosure,
    Spacer,
    IconButton,
    VStack,
    useColorMode,
    Image,
    Text,
    Button,
    MenuList,
    MenuButton,
    Menu,
    MenuDivider,
    MenuItem,
    FormControl,
    FormLabel,
    Switch,
    Icon,
  } from "@chakra-ui/react";

import { BiGhost } from "react-icons/bi"
import { AiOutlinePlus, AiOutlineCrown } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import { MdOutlineWbSunny } from "react-icons/md";


import Logo from '../Logo.png';

import { AuthContext } from '../contexts/auth';


const NavBar = ({ usd, onClick, handleLogout }) => {
    const fontSizeDolarH = { base:'8px', md:'10px', lg:'12px'};
    const fontSizeDolarBody = { base:'15px', md:'18px', lg:'20px'};
    const bg = useColorModeValue("white", "black");
    const mobileNav = useDisclosure();
    const { toggleColorMode: toggleMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(FaMoon, MdOutlineWbSunny);
    const logoColor = useColorModeValue("linear(to-r, blue.900, blue.800, blue.600, blue.300)", "linear(to-r, purple.300, purple.200, gray.100, white)");
    const [location, setLocation ] = useState(true);

    const { toogleCurrency, redirectToPortal, subscription } = useContext(AuthContext);

    useEffect(() => {
      const localUrl = process.env.REACT_APP_SITE_URL

      if (window.location.href !== localUrl){
        setLocation(false)
      }
      
    }, [])

    
  
    const MobileNavContent = (
      <VStack
        pos="absolute"
        top={0}
        left={0}
        right={0}
        display={mobileNav.isOpen ? "flex" : "none"}
        flexDirection="column"
        p={2}
        pb={4}
        m={2}
        bg={bg}
        spacing={3}
        rounded="sm"
        shadow="sm"
      >
      </VStack>
    );

  return (
    <React.Fragment>
      <chakra.header 
        h="full" 
        bg={bg} 
        w="full" 
        px={{ base: 2, sm: 4 }} 
        py={4} 
        shadow="md"
      >
        {!!location ? 
        <Flex 
          alignItems="center" 
          justifyContent="space-between" 
          mx="auto"
        >
          <Link to ="/">
            <Image 
              src={Logo} 
              alt="Logo" 
              boxSize='60px' 
            />
          </Link>
          <Link to='/'>
          <Box 
            display={{ base: "none", md: "inline-flex" }}
          >
            <HStack spacing={1}>
              <Box role="group">
                <Text
                  fontWeight="extrabold"
                  fontSize='3xl'
                  bg={bg}
                  alignItems="center"
                  bgGradient={logoColor}
                  bgClip="text"
                >
                  Ghost Portfolio
                </Text>
              </Box>
            </HStack>
          </Box>
          </Link>
          <Spacer />
          
          <HStack 
            spacing={5} 
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
            <Box bg='gray' p='2' rounded='lg' >
              <VStack >
                <Text fontSize={fontSizeDolarH} color='white'> USD / BRL</Text>
                <Text fontSize={fontSizeDolarBody} color='white'>{Number(usd).toFixed(2)}</Text>
              </VStack>
            </Box>
          <Flex display={{ base: "none", md: "inline-flex" }}>
            <FormControl display='flex' alignItems='center'>
              <FormLabel >
                  USD
                </FormLabel>
                <Switch 
                  id='change-currency' 
                  size='lg'
                  onChange={toogleCurrency}
                />
                <FormLabel ml="5px" >
                  BRL
                </FormLabel>
            </FormControl>
          </Flex>
          <Button 
            colorScheme="teal" 
            leftIcon={<AiOutlinePlus />}
            onClick={onClick}
            _hover={{ bg: "teal.700" }}
          >
              Adicionar
          </Button>
          {subscription === true ?
            <Icon
              as={AiOutlineCrown}
              variant='outline'
              w={8} 
              h={8}
            />

          :
            <Link to="/subscription">
              <Button 
                colorScheme="yellow"
                leftIcon={<BiGhost />}
                onClick={null}
              >
                Assinar
              </Button>
            </Link>  
          } 
            <Flex alignItems={'center'}>
              {subscription === true ?
                <Menu>
                  <MenuButton
                    as={Button}
                    variant={'link'}
                    minW={0}
                    rightIcon={<VscSettingsGear />}
                  >
                  </MenuButton>
                  <MenuList>
                      <MenuItem onClick={redirectToPortal}>Assinatura</MenuItem>
                    <Link to="/userdata">
                      <MenuItem>Alterar Dados</MenuItem>
                    </Link>
                    <Link to="/contact">
                      <MenuItem>Enviar Mensagem</MenuItem>
                    </Link>
                    <Link to="/transactions">
                      <MenuItem>Histórico de transações</MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              :
                <Menu>
                  <MenuButton
                    as={Button}
                    variant={'link'}
                    minW={0}
                    rightIcon={<VscSettingsGear />}
                  >
                  </MenuButton>
                  <MenuList>
                    <Link to="/userdata">
                      <MenuItem>Alterar Dados</MenuItem>
                    </Link>
                    <Link to="/contact">
                      <MenuItem>Enviar Mensagem</MenuItem>
                    </Link>
                    <Link to="/transactions">
                      <MenuItem>Histórico de transações</MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              }   
            </Flex>
            <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
                isRound="true"
            />           
          </HStack>
        </Flex>
        :
        <Flex 
          alignItems="center" 
          justifyContent="space-between" 
          mx="auto"
        >
          <Link to ="/">
            <Image 
              src={Logo} 
              alt="Logo" 
              boxSize='60px' 
            />
          </Link>
          <Link to='/'>
          <Box 
            display={{ base: "none", md: "inline-flex" }}
          >
            <HStack spacing={1}>
              <Box role="group">
                <Text
                  fontWeight="extrabold"
                  fontSize='3xl'
                  bg={bg}
                  alignItems="center"
                  bgGradient={logoColor}
                  bgClip="text"
                >
                  Ghost Portfolio
                </Text>
              </Box>
            </HStack>
          </Box>
          </Link>
          <Spacer />
          
          <HStack 
            spacing={5} 
            display={mobileNav.isOpen ? "none" : "flex"}
            alignItems="center"
          >
          {subscription === true ?
            <Icon
              as={AiOutlineCrown}
              variant='outline'
              w={8} 
              h={8}
            />

          :
            <Link to="/subscription">
              <Button 
                colorScheme="yellow"
                leftIcon={<BiGhost />}
                onClick={null}
              >
                Assinar
              </Button>
            </Link>  
          }
            <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: "0", md: "3" }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
                isRound="true"
            />           
          </HStack>
        </Flex>
        }
        {MobileNavContent}
      </chakra.header>
    </React.Fragment>
  );
}

export default NavBar