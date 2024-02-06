import { useUrl } from "../../context/urlContext";
import { Navigate } from 'react-router-dom';

const UserDashboard = () => {
  const {user} = useUrl();

  return (
    <>
    {user.email ?
      <main className="min-h-[90vh] flex flex-col items-center justify-center gap-10 sm:px-24 px-2 pt-8">
        Dashboard
      </main>
    :
    <Navigate to="/login" />  
    }
    </>
  );
};

export default UserDashboard;
