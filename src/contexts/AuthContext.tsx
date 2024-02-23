import React, {useState, useReducer} from 'react';

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

    console.log(state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider