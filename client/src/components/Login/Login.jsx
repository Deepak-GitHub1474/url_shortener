import { Link } from 'react-router-dom';

const Login = () => {

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-4 px-2">
            <form className="flex flex-col gap-4 sm:w-[500px] w-[95vw] pb-4 pt-4 px-2 rounded-lg shadow-[0_0_1px_gray] relative overflow-hidden">
                <h1 className="text-center font-bold text-3xl text-blue-500 mb-2">Login Form</h1>
                <input type="email" name="email" placeholder="email" className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]" />
                <input type="password" name="password" placeholder="password" className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]" />
                <button className="bg-blue-600 text-white font-bold rounded-md p-3 hover:bg-blue-500 cursor-pointer flex items-center justify-center">
                    Login
                </button>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <span>Have an account?</span>
                    <Link to="/register" className="font-semibold underline hover:text-blue-400">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
