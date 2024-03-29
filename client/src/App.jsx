import { Route, Routes } from "react-router-dom"
import Header from "./components/Header/Header"
import LandingPage from "./components/LandingPage/LandingPage"
import UserDashboard from "./components/UserDashboard/UserDashboard"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {

  return (
    < >
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
