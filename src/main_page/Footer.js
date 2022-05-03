import React, {useContext} from 'react';

import { Link } from "react-router-dom";

import {
  Box,
  Container,
  Stack,
  Text,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';

import { FaTwitter } from 'react-icons/fa';
import { BsYoutube, BsInstagram } from 'react-icons/bs';

import { AuthContext } from '../contexts/auth';

  
export default function SmallCentered() {
    const {  subscription } = useContext(AuthContext);

    return (
      <Container as="footer" role="contentinfo" py='2' >
        <Box>
        <Container
            as={Stack}
            py={4}
            spacing={4}
            justify={'center'}
            align={'center'}>
            <Stack direction={'row'} spacing={6}>
              <Link to="/about" style={{ textDecorationLine: 'underline', fontSize: '15px' }} >Sobre</Link>
              <Link to="/contact" style={{ textDecorationLine: 'underline', fontSize: '15px' }}>Contato</Link>
              {subscription === true ?
              <span></span>
              :
              <Link to="/subscription" style={{ textDecorationLine: 'underline', fontSize: '15px' }}>Assinar</Link>
              }              
            </Stack>
          </Container>
          <Box
            borderTopWidth={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <Container
                as={Stack}
   
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}

              >
                <Text>© 2022 Levemente Livre - Ghost portfolio. Todos os direitos reservados.</Text>
                <Stack direction={'row'} spacing={6}>
                  <Link to='/twitter'>
                    <IconButton colorScheme='twitter' icon={<FaTwitter />} />
                  </Link>
                  <Link to="/instagram">
                    <IconButton colorScheme='pink' icon={<BsInstagram />} />
                  </Link>
                  <Link to="/youtube">
                    <IconButton colorScheme='red' icon={<BsYoutube />} />
                  </Link>
                </Stack>
              </Container>
          </Box>
        </Box>
      </Container>
    );
  }