import { Link } from 'react-router-dom';

function Header() {

  return (
    <header className="h-[10vh] p-4 bg-[#ffffff] w-full shadow-[0_0_2px_#0000ff] flex items-center justify-center gap-6 fixed top-0 left-0 right-0">

       <Link to="/">
          <h1 className="w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold text-center">
            Home
          </h1>
       </Link>
          
        <Link to="/login">
            <button className=" w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold" >
            LogIn
            </button>
        </Link>
        <Link to="/register">
            <button className=" w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold">
            Register
            </button>
        </Link>

        <Link to="/dashboard">
            <button className=" w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold">
              Dashboard
            </button>
        </Link>
        <Link to="/login" >
          <button className=" w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold" >
            Logout
          </button>
        </Link>
    </header>
  );
}
export default Header;
