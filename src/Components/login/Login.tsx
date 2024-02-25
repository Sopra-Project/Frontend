import {useEffect, useState} from "react";
import {useLogin} from "../../hooks/useLogin";
import isDev from "../../utils/DevDetect";
import {useNavigate} from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext";

const Login = () => {

    const [email, setEmail] = useState('')
    const {login, sendCode} = useLogin()
    const {user} = useAuthContext()

    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        void login(email)
    }

    useEffect(() => {
        if (user && isDev()) {
            if(user.role === 'SUPER_ADMIN') {
                navigate('/superadmin')
            } else {
                navigate('/')
            }
        }
    }, [navigate, user])


    return (
        <div className="p-4">
            <form onSubmit={handleSubmit}>
                <input type="email" className="border border-gray-300 rounded-md px-4 py-2 mb-4"
                       placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login
                </button>
            </form>
        </div>

    )
}

export default Login;