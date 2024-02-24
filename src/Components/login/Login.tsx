import {useState} from "react";
import {useLogin} from "../../hooks/useLogin";
import isDev from "../../utils/DevDetect";
import {useNavigate} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState('')
    const {login, sendCode} = useLogin()

    const navigate = useNavigate()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        login(email).then(_ => {
            if(isDev()){
                navigate("/")
            }
        })

    }


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