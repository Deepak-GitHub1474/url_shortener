import { useUrl } from '../../context/urlContext';
import {BASE_URL} from "../../config/config.js";

import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { user } = useUrl();
    
    axios.defaults.withCredentials = true;
    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${BASE_URL}/login`, { email, password })
            .then(res => {
                if (res.data.msg === "Success") {
                    window.location.href = "/";
                }
            })
            .catch(err => {
                alert(err.response.data.msg);
                console.log(err);
            })
    }
                        
    return (
        <div className="flex items-center justify-center py-8 px-2">
            {!user.email ? 
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:w-[500px] w-[95vw] pb-4 pt-4 px-2 rounded-lg shadow-[0_0_1px_gray] relative overflow-hidden">
                <h1 className="text-center font-bold text-3xl text-blue-500 mb-2">Login Form</h1>
                <input 
                    required
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]" 
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    required
                    type="password" 
                    name="password"
                    placeholder="password" 
                    className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="bg-blue-600 text-white font-bold rounded-md p-[0.7rem] hover:bg-blue-500 cursor-pointer flex items-center justify-center">
                    Login
                </button>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <span>Have an account?</span>
                    <Link to="/register" className="font-semibold underline hover:text-blue-400">Register</Link>
                </div>
            </form>
            :
            <Navigate to="/" />
            } 
        </div>
    );
}

export default Login;
