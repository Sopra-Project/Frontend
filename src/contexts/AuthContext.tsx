import React, {useEffect, useReducer} from 'react';
import {jwtDecode} from "jwt-decode";
import {AuthUser} from "../types/types"
import {useNavigate} from 'react-router-dom';
import {API_URL} from "../utils/SystemVars";

interface Props {
    children: JSX.Element[] | JSX.Element
}

interface AuthContextType {
    dispatch: React.Dispatch<any>;
    user: AuthUser | null;
}

export const AuthContext = React.createContext<AuthContextType>({
    dispatch: () => {
    },
    user: null
});


export const authReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: getUserFromToken(action.payload)}
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
        if (window.location.pathname === "/validate") {
            return
        }
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        validateToken(token).then((valid) => {
            if (!valid) {
                localStorage.removeItem('token')
                dispatch({type: 'LOGOUT'})
                navigate('/login')
                return
            }
        })
        if (token) {
            dispatch({type: 'LOGIN', payload: token})
        }
    }, [navigate])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

const validateToken = async (token: string): Promise<boolean> => {
    const url = API_URL + "/api/auth/validate/token";
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            console.error("Error while validating token:", response);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error while validating token:", error);
        return false;
    }
}

const getUserFromToken = (token: string): AuthUser => {
    const decoded: any = jwtDecode(token)
    const user: AuthUser = {
        name: decoded.name,
        expiresIn: decoded.exp,
        token: token,
        building: decoded.building,
        role: decoded.role
    }
    return user
}

export default AuthContextProvider