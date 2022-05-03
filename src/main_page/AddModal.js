import React, { useState, useEffect } from "react";
import axios from 'axios';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  Button,
  Input,
  Box,
  Select,
  RadioGroup,
  Radio,
  HStack,
  Spacer,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

import { CloseIcon, CheckIcon } from '@chakra-ui/icons'


export default function AddModal({ isOpen, onClose, addTransaction }) {
    const [type, setType] = useState('1');
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [pricePurchasedAt, setPricePurchasedAt] = useState("");
    const [numberOfCoins, setNumberOfCoins] = useState("");
    const [coins, setCoins] = useState([]);


    useEffect(()=>{
        axios.get(process.env.REACT_APP_COINS)
        .then((response)=> {
          setCoins(response.data);      
        }).catch(error => console.log(error));   
      }, [isOpen]);
    
    const nofilteredCoins = coins.filter(coin=>
        coin.name
    )

    useEffect(()=>{ 
        setName('');
        setAmount('');
        setPricePurchasedAt('');
        setNumberOfCoins('');
    }, [isOpen])

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" overS >
                <ModalContent>
                    <ModalHeader>Insira uma Transação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={10} mt="10px">
                        <FormControl as='fieldset' isRequired> 
                            <FormLabel as='legend' style={{fontWeight: "bold"}}>Criptomoeda:</FormLabel> 
                            <Select
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                focusBorderColor="tomato"
                                placeholder="Escolha a criptomoeda"
                                > 
                                { nofilteredCoins.map(coin => {
                                    return <option
                                    key={coin.id}
                                    name={coin.name}
                                    >{coin.name}</option>;
                                    
                                })}
                            </Select>
                            <FormHelperText>Selecione uma criptomoeda da lista</FormHelperText>
                        </FormControl>
                        <FormControl as='fieldset' isRequired> 
                            <FormLabel as='legend' style={{fontWeight: "bold"}}>Valor:</FormLabel> 
                            {type === '1' ?
                                amount.includes(",") ?
                                    <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Total da compra (EM DÓLARES)"
                                            
                                        />
                                        <InputRightElement children={<CloseIcon color='red.500' />} />
                                    </InputGroup>
                                    <FormHelperText color='red.400'>Utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                                    </>
                                :
                                    <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Total da compra (EM DÓLARES)"
                                            
                                        />
                                        <InputRightElement children={<CheckIcon color='green.500' />} />
                                    </InputGroup>
                                    <FormHelperText >Utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                                    </>
                                
                            :
                                amount.includes(",") ?
                                    <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Total da venda (EM DÓLARES)"
                                            
                                        />
                                        <InputRightElement children={<CloseIcon color='red.500' />} />
                                    </InputGroup>
                                    <FormHelperText color='red.400'>Utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                                    </>
                                :
                                    <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="Total da venda (EM DÓLARES)"
                                            
                                        />
                                        <InputRightElement children={<CheckIcon color='green.500' />} />
                                    </InputGroup>
                                    <FormHelperText>Utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                                    </>
                            }
                            
                        </FormControl>
                        <FormControl as='fieldset' isRequired>
                                <FormLabel as='legend' style={{fontWeight: "bold"}}>Preço de compra:</FormLabel>
                                {type === '1' ?
                                    pricePurchasedAt.includes(",") ?
                                    <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input
                                            value={pricePurchasedAt}
                                            onChange={(e) => setPricePurchasedAt(e.target.value)}
                                            placeholder="Preço da criptomoeda (EM DÓLARES)"
                                        />
                                        <InputRightElement children={<CloseIcon color='red.500' />} />
                                    </InputGroup>
                                    <FormHelperText color='red.400' >Utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                                    </>
                                    :
                                    <>
                                    <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        color='gray.300'
                                        fontSize='1.2em'
                                        children='$'
                                    />
                                    <Input
                                        value={pricePurchasedAt}
                                        onChange={(e) => setPricePurchasedAt(e.target.value)}
                                        placeholder="Preço da criptomoeda (EM DÓLARES)"
                                    />
                                    <InputRightElement children={<CheckIcon color='green.500' />} />
                                    </InputGroup>
                                    <FormHelperText >Utilize pontos para separar casas decimais (Exemplo: 25.58)</FormHelperText>
                                    </>
                                    :
                                    <>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            color='gray.300'
                                            fontSize='1.2em'
                                            children='$'
                                        />
                                        <Input
                                            value=""
                                            onChange={(e) => setPricePurchasedAt(e.target.value)}
                                            placeholder="Campo calculado automaticamente."
                                            isDisabled
                                        />
                                    </InputGroup>
                                    <FormHelperText >Este campo será o valor médio de aquisição</FormHelperText>
                                    </>
                                }
                            
                        </FormControl>
                        
                        <FormControl as='fieldset' isRequired>
                            <FormLabel as='legend' style={{fontWeight: "bold"}}>Quantidade de criptomoedas:</FormLabel>
                            {numberOfCoins.includes(",") ?
                            <>
                            <InputGroup>
                                <Input
                                value={numberOfCoins}
                                onChange={(e) => setNumberOfCoins(e.target.value)}
                                placeholder="Quantidade de criptomoedas"
                                />
                                <InputRightElement children={<CloseIcon color='red.500' />} />
                            </InputGroup>
                            <FormHelperText color='red.400' >Utilize pontos para separar casas decimais (Exemplo: 0.008)</FormHelperText>
                            </>
                            :
                            <>
                            <InputGroup>
                                <Input
                                value={numberOfCoins}
                                onChange={(e) => setNumberOfCoins(e.target.value)}
                                placeholder="Quantidade de criptomoedas"
                                />
                                <InputRightElement children={<CheckIcon color='green.500' />} />
                            </InputGroup>
                            <FormHelperText >Utilize pontos para separar casas decimais (Exemplo: 0.008)</FormHelperText>
                            </>
                            }
                        </FormControl>
                        
                        <Box>
                            <RadioGroup 
                            value={type}
                            onChange={setType}
                            >    
                                <HStack spacing={5} direction="row">
                                    <Radio colorScheme="green" value='1' onSelect={setType}>Compra</Radio>
                                    <Spacer />
                                    <Radio colorScheme="red" value='2' onSelect={setType}>Venda</Radio>
                                </HStack>
                            </RadioGroup>
                        </Box>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        {type === '1' ?
                            !name || !amount || !pricePurchasedAt || !numberOfCoins ?
                                <Button
                                    bg="teal"
                                    color="white"
                                    mr={3}
                                    size="lg"
                                    isDisabled={true}
                                    onClick={null}
                                >
                                Adicionar Transação
                                </Button>
                            :
                                <Button
                                    bg="teal"
                                    color="white"
                                    mr={3}
                                    size="lg"
                                    onClick={() => addTransaction(name, type, amount, pricePurchasedAt, numberOfCoins)}
                                >
                                Adicionar Transação
                                </Button>
                        :
                            !name || !amount || !numberOfCoins ?
                                <Button
                                    bg="tomato"
                                    color="white"
                                    mr={3}
                                    size="lg"
                                    isDisabled={true}
                                    onClick={null}
                                >
                                Adicionar Transação
                                </Button>
                            :
                                <Button
                                bg="tomato"
                                color="white"
                                mr={3}
                                size="lg"
                                onClick={() => addTransaction(name, type, amount, pricePurchasedAt, numberOfCoins)}
                                >
                                Adicionar Transação
                                </Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>    
        
    );
}