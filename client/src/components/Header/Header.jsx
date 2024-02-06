import { Link } from 'react-router-dom';
import { useUrl } from '../../context/urlContext';
import { BASE_URL } from '../../config/config';
import axios from 'axios';

function Header() {

  const {user} = useUrl();

  // Logout
  const handleLogout = () => {
    axios.get(`${BASE_URL}/logout`)
        .then(res => {
            if (res.data.msg === "Success")
            console.log(res);
                window.location.href = "/login";
        }).catch(err => console.log(err))
  }

  return (
    <header className="h-[10vh] p-4 bg-[#ffffff] w-full shadow-[0_0_2px_#0000ff] flex items-center justify-center gap-6 fixed top-0 left-0 right-0">

       <Link to="/">
          <h1 className="w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold text-center">
            Home
          </h1>
       </Link>
          
        <>
          {!user.email ? 
          <>
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
        </>
        :
        <>
          <Link to="/dashboard">
              <button className=" w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold">
                Dashboard
              </button>
          </Link>
          <button onClick={handleLogout} className=" w-24 bg-slate-100 hover:bg-slate-200 py-2 px-1 font-semibold" >
              Logout
            </button>
        </>  
        }
        </>
    </header>
  );
}
export default Header;
