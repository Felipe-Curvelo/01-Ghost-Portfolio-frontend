import "@stripe/stripe-js"

import React, { useContext } from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import { VStack, HStack, Spinner } from "@chakra-ui/react";

import Home from "./main_page/Home"
import About from "./support_pages/About";
import Contact from "./support_pages/Contact";
import Instagram from "./support_pages/Instagram";
import Twitter from "./support_pages/Twitter";
import Youtube from "./support_pages/Youtube";

import { AuthProvider, AuthContext } from './contexts/auth';
import Checkout from "./payment/Checkout";
import Success from "./payment/Success";
import Cancel from "./payment/Cancel";
import UserData from "./support_pages/UserData";
import TransactionsTable from "./main_page/TransactionsTable";
import LoginPage from "./login_page/LoginPage";
import SendForgotPassword from "./login_page/SendForgotPassword";
import ResetPassword from "./login_page/ResetPassword";
import Signup from "./login_page/Signup";

const AppRoutes = () => {
    
    

    const Private = ({ children }) => {
        const { authenticated, loading, expiredUser } = useContext(AuthContext);
        
     
        if(loading){
            return (    <VStack>
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
    
        if (!authenticated){
            return <Navigate to="/login" />
        }

        if (expiredUser){
            return <Navigate to="/subscription" />
        }
    
        return children
    }

    return(
        <Router>
            <AuthProvider>
                <Routes>
                        {/* Rotas Abertas */}
                        <Route exact path ="/login" element={<LoginPage />} />
                        <Route exact path ="/forgotpassword" element={<SendForgotPassword />} />
                        <Route path ="/reset/*" element={<ResetPassword />} />
                        <Route exact path ="/signup" element={<Signup />} />
                        <Route exact path ="/success/*" element={<Success />} />
                        <Route exact path ="/cancel/*" element={<Cancel />} />
                        <Route exact path ="/about" element={<About />} />
                        <Route exact path ="/contact" element={<Contact />} />
                        <Route exact path ="/twitter" element={<Twitter/>} />
                        <Route exact path ="/instagram" element={<Instagram />} />
                        <Route exact path ="/youtube" element={<Youtube />} />
                        <Route exact path ="/subscription" element={<Checkout />} />

                        {/* Rotas Protegidas */}
                        
                        <Route exact path ="/" element={<Private><Home /></Private>} />
                        <Route exact path ="/transactions" element={<Private><TransactionsTable /></Private>} />
                        <Route exact path ="/userdata" element={<Private><UserData /></Private>} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes