import isDev from "../utils/DevDetect";
import {useAuthContext} from "./useAuthContext";
import {API_URL} from "../utils/SystemVars";

export const useLogin = () => {
    const {dispatch} = useAuthContext();
    const URL = API_URL;

    const login = async (email: string) => {
        fetch(URL + '/api/auth/login', {
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
        fetch(URL + '/api/auth/code', {
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