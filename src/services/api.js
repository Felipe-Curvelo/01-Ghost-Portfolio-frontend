import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';


export const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export const getRollups = async() =>{
        let url = `/get_rollups_by_coin`
        return api.get(url)
}

export const getTransactions = async() =>{
    let url = `/transactions`
    return api.get(url)

}

export const PostTransactions = async(name, type, amount, pricePurchasedAt, numberOfCoins) =>{
    const token = localStorage.getItem('token');

    api.defaults.headers.Authorization = `Bearer ${token}`

    const url = `/transactions`

    return api.post(url, {name:name, type:type, amount:amount * 100, price_purchased_at:pricePurchasedAt, no_of_coins:numberOfCoins})
    .catch(error =>{
        console.error('timeout excedido')
        
    })
}

export const deleteTransactions = async(name) =>{
    
    const token = localStorage.getItem('token');

    const url = `/transactions`

    return api.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: {
            name: name
        }
    })
}

export const updateUserPremium = async() =>{
    
    const token = localStorage.getItem('token');

    const url = `/sub`

    
    return api.post(url, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
}

export const createSession = async (email, password) =>{
    return api.post('/login', {email, password})
};