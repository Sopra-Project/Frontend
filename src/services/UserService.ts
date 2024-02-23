import axios from "axios"

const login = (email: string)  => {
    axios.post('http://localhost:8080/api/auth/login', { email: email }).then((response) => {
        if(response.status === 200) {
            localStorage.setItem('token', response.data)
        }
    })
}

export default {
    login
}