import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, createSession } from '../services/api';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [ currencyController, setCurrencyController ] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const [ authenticated, setAuthenticated ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ user, setUser ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const [ subscription, setSubscription ] = useState('');
    const [ plan, setPlan ] = useState('');
    const [expiredUser, setExpiredUser] = useState('');
    
    

    useEffect(() => {
        setLoading(true)
        const checkUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (checkUser){
            api.defaults.headers.Authorization = `Bearer ${token}` 
            setAuthenticated(true);
        }

        if (checkUser && checkUser.user.check === 1){

            setSubscription(checkUser.context.subscription.plan.active)   

            setPlan(checkUser.context.product.name)
        }

        if (checkUser && checkUser.user.user_status === 'expired'){
            setExpiredUser(true)
        }

        setLoading(false)
    }, []);


    const handleLogin = async (e) => {
        try{
        setLoading(true)
        e.preventDefault();
        const response = await createSession(email, password)

        localStorage.setItem('token', response.data.token)

        setUser(response.data) 
        localStorage.setItem('user', JSON.stringify(response.data))
        
        api.defaults.headers.Authorization = `Bearer ${response.data.token}`

        if (response.data.user.check === 1){
            setSubscription(response.data.context.subscription.plan.active)   
            console.log(subscription) 

            setPlan(response.data.context.product.name)
            console.log(plan)
        }

        setAuthenticated(true);

        if (response.data.user.user_status === 'expired'){
            setExpiredUser(true)
        }
        else {
            setLoading(false)
            navigate('/')
        }
        
        }catch(error){
            setLoading(false)
            if(error.message === 'Network Error'){

                toast({
                    title: 'Problemas no Servidor, tente novamente mais tarde',
                    description: 'Estamos com problemas no servidor, nossa equipe já está tomando as providências necessárias. Pedimos desculpas pelo inconveniente.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }else{

                toast({
                    title: 'Email ou senha não conferem',
                    description: 'Certifique que esteja digitando as credenciais corretas ou se preferir, peça um reset de senha',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            }
        } 
      }

    const logout = () => {
        setAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        api.defaults.headers.Autorization = undefined;
        setUser(null);

        navigate('/login');
    }

    const redirectToPortal = async () => {
        const token = localStorage.getItem('token');
        const options = {
          method: 'POST',
          url:`${process.env.REACT_APP_BASE_URL}/create-customer-portal-session`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios(options)
        .then(response => {
            window.location.href =response.data
        });
      }


    const toogleCurrency = () => {
   
        setCurrencyController(currencyController => !currencyController)

        if(!currencyController){
            toast({
                title: 'Conversão aproximada!',
                description: 'As cotações de mercado podem divergir com o que é apresentado.',
                status: 'info',
                duration: 9000,
                isClosable: true,
                });
        }
    };


    return (
        <AuthContext.Provider
        value = {{
            expiredUser,
            subscription,
            plan,
            navigate,
            redirectToPortal,
            authenticated,
            handleLogin,
            setPassword,
            setEmail,
            user,
            logout,
            loading,
            setLoading,
            toogleCurrency,
            currencyController,
            toast
        }}
        >
            {children}
        </AuthContext.Provider>

    );
};