import isDev from "../utils/DevDetect";
import {useAuthContext} from "./useAuthContext";

export const useLogin = () => {
    const {dispatch} = useAuthContext();

    const login = async (email: string) => {
        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: email})
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                if (isDev()) {
                    localStorage.setItem('token', data.token);
                    dispatch({type: 'LOGIN', payload: data.token});
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }

    const sendCode = async (code: string, email: string) => {
        fetch('http://localhost:8080/api/auth/code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: code, email: email})
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(data => {
            localStorage.setItem('token', data.token);
            dispatch({type: 'LOGIN', payload: data.token});
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    return {login, sendCode};

}