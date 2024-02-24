import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');

}

export const setAuthHeader = (token: string) => {
    window.localStorage.setItem('auth_token', token);
}

export const request = async (url: string, method: string, data?: any) => {
    let headers = {};
    if (getAuthToken() !== null && getAuthToken() !== "null"){
        headers = {"Authorization": `Bearer ${getAuthToken()}`};

    }
    
    return axios({
        method: method,
        url: url,
        data: data,
        headers: headers
    });
  };
