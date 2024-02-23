import React, {useState, useReducer, useEffect} from 'react';
import {jwtDecode} from "jwt-decode";
import {User} from "../types/types"

interface Props {
    children: JSX.Element[] | JSX.Element
}

export const AuthContext = React.createContext({
    dispatch: (action: any) => {
    }, user: null
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

    useEffect(() => {
        const token = localStorage.getItem('token')
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

    console.log(state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider