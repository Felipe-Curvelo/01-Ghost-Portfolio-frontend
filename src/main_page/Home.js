import React, { useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';

import {
  useDisclosure,
  VStack,
  Spinner,
  HStack,
  Text,
  Heading,
  Flex,
  useToast,
} from "@chakra-ui/react";

import ListTable from './ListTable';
import NavBar from './NavBar';
import Summary from './Summary';
import Visualization from './Visualization';
import Footer from './Footer';
import AddModal from './AddModal';

import { getRollups, getTransactions, PostTransactions, deleteTransactions } from '../services/api';
import { AuthContext } from '../contexts/auth';


const Home = () => {
  const { logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ rollups, setRollups ] = useState([]);
  const [ portfolioCost, setPortfolioCost ] = useState(0);
  const [ portfolioValue, setPortfolioValue ] = useState(0);
  const [ absoluteGain, setAbsoluteGain ] = useState(0.0001);
  const [ totalGainPercent, setTotalGainPercent ] = useState(0);
  const [ btcEq, setBtcEq ] = useState(0);
  const [ initialBtcEq, setInitialBtcEq ] = useState(0);
  const [ brlPortValue, setBrlPortValue ] = useState(0);
  const [ usd, setUsd ] = useState([]);
  const [ transactions, setTransactions ] = useState([]);
  const [ loadingError, setLoadingError ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const toast = useToast();
  
  const [ expiredToken, setExpiredToken ] = useState('');

  const loadRollups = async () => {
    try {
      setLoading(true)
      const response = await getRollups()
      
      setRollups(response.data);
      let costAccumulator = 0;
      let valueAccumulator = 0;
      let btcEquivalence = 0;
      let initialBtcEq = 0;
      let cotacao_usd = 0;
      let portfolioBrl =0;
      response.data.forEach((item) => {
          costAccumulator += item["total_cost"];
          valueAccumulator += item["total_equity"];
          btcEquivalence += item["total_equity"] / item["bitcoin_lp"];
          initialBtcEq += item["total_cost"] / item["bitcoin_lp"]
          cotacao_usd = item["usd_cot"];
          portfolioBrl += item["brl_conv_total"];
      });
      let absoluteGain = valueAccumulator - costAccumulator;
      setPortfolioCost(costAccumulator);
      setPortfolioValue(valueAccumulator);
      setAbsoluteGain(absoluteGain);
      isNaN(setTotalGainPercent((absoluteGain / costAccumulator) * 100) || 0);
      setBtcEq(btcEquivalence);
      setInitialBtcEq(initialBtcEq);
      setUsd(cotacao_usd);
      setBrlPortValue(portfolioBrl);
      setLoading(false);
    } catch (error) {
        console.log(error.name);
        console.log(error.message);
        if(error.message === 'Request failed with status code 401'){
          setExpiredToken(true);
          setLoading(false);
          setLoadingError(false);
        } else {
          setLoadingError(true);
          setExpiredToken(false);
          setLoading(false);
        }
    }
  };

  const loadTransactions = async () => {
    setLoading(true)
    const response = await getTransactions();
    setTransactions(response.data)
    setLoading(false)
  };

  useEffect(() =>{


    (async () => await loadRollups())();
    (async () => await loadTransactions())();


  }, []);

  const addTransaction = async (name, type, amount, pricePurchasedAt, numberOfCoins) => {
    try {
        setLoading(true)
        await PostTransactions(name, type, amount, pricePurchasedAt, numberOfCoins);
        await loadTransactions();
        await loadRollups();

        onClose();
        setLoading(false)

    } catch (err) {
      setLoading(false)
      console.error(err.message);
      console.error(err);
      setLoadingError(true);
    }
  }

  const deleteCoin = async (name) => {
    try {
      setLoading(true)
      await deleteTransactions(name);
      await loadTransactions();
      await loadRollups();

      onClose();

      setLoading(false)

    } catch (err) {
      console.error(err);
      setLoadingError(true);
    }
  }

  const handleLogout = () => {
    logout();
  }

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

if (loadingError){
  return (
    <Flex
        justify='center'
        alignSelf='center' 
        style={{
            backgroundImage: `url("https://i.ibb.co/N7ssJWS/Dizzy-Screenp2.png")`,
            width: '100vw',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
          }}
        >
      <Flex>
        <VStack spacing='10' mt='10' mx='10'>
            <Heading fontSize='40'  mx='10' mt='10' >
              Ops! Algo deu errado!
            </Heading>
            <Text fontSize='20' color='tomato'>
              <p >Possíveis causas:</p>
              <p> - Algum erro temporário, tente recarregar a página.</p>
              <p> - Alguma informação inserida errada, tente recarregar a página.</p>
              <p> - Indisponibilidade no servidor, tente se conectar mais tarde.</p>
              <p> - A página está indisponível, tente se logar de novo.</p>
            </Text>
            <Text fontSize='25'>Clique {' '}
              <Link style={{ color: 'cyan', textDecorationLine: 'underline', fontSize: '25px' }} to="/login">aqui</Link>
              {' '} para logar novamente.
            </Text>
            <Text fontSize='25'>Caso o problema persista entre em {' '}
              <Link style={{ color: 'cyan', textDecorationLine: 'underline', fontSize: '25px' }} to="/contact">contato</Link>
              {' '} conosco.
            </Text>
        </VStack>
      </Flex>
      </Flex>
  )
}

if (expiredToken){
  return (
      
      <VStack >
          <HStack mt="300px" mr='10' ml='10'>
              <Text fontSize='30px'>Seu acesso expirou. Clique{" "}  
              <Link style={{ color: 'cyan', textDecorationLine: 'underline', fontSize: '30px' }} to="/login">aqui</Link>
              {" "}para logar novamente.</Text>
          </HStack>
      </VStack>
      
  )
}

  
  return (
    <>

      <NavBar 
        usd={usd}
        onClick={onOpen}
        handleLogout={handleLogout}
      ></NavBar>
      <AddModal isOpen={isOpen} onClose={onClose} setLoadingError={setLoadingError} addTransaction={addTransaction}></AddModal>
      <Summary 
        portfolioCost={portfolioCost}
        portfolioValue={portfolioValue}
        absoluteGain={absoluteGain}
        totalGainPercent={totalGainPercent}
        btcEq={btcEq}
        brlPortValue={brlPortValue}
        initialBtcEq={initialBtcEq}
        usd={usd}
      ></Summary> 
      <ListTable rollups={rollups} usd={usd} deleteCoin={deleteCoin} onClose={onClose}></ListTable>
      <Visualization rollups={rollups}></Visualization>
      <Footer></Footer>
    </>
  )
}

export default Home