import React, {useState, useReducer, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import {User} from "../types/types"
import { useNavigate } from 'react-router-dom';

interface Props {
    children: JSX.Element[] | JSX.Element
}

interface AuthContextType {
    dispatch: React.Dispatch<any>;
    user: User | null;
}

export const AuthContext = React.createContext<AuthContextType>({
    dispatch: () => { },
    user: null
});


export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

const AuthContextProvider = (props: Props) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate('/login')
        }
        if (token) {
            const decoded: any = jwtDecode(token)
            const user: User = {
                name: decoded.name,
                expiresIn: decoded.exp,
                token: token,
                building: decoded.building,
                role: decoded.role
            }
            dispatch({type: 'LOGIN', payload: user})
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider