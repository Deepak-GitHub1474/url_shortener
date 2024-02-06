import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { isEmail, isValidPassword } from "../../helpers/RegExMatch";
import { useState } from "react";
import { BASE_URL } from "../../config/config";

const Register = () => {

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  // Register
  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 3) {
      alert("Name should be atleast of 3 characters");
      return;
    }
    if (!isEmail(email)) {
      alert("Invalid email provided");
      return;
    }
    if (!isValidPassword(password)) {
      alert(
        "Invalid password provided, password should 6-16 character long with atleast a number and a special character"
      );
      return;
    }

    axios
      .post(`${BASE_URL}/register`, { name, email, password })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.msg);
        console.log(err);
      });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-4 px-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 sm:w-[500px] w-[95vw] pb-4 pt-4 px-2 rounded-lg shadow-[0_0_1px_gray] relative overflow-hidden"
      >
        <h1 className="text-center font-bold text-3xl text-blue-500 mb-2">
          Register Form
        </h1>
        <input
          required
          type="text"
          name="name"
          placeholder="name"
          className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="email"
          className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          name="password"
          placeholder="password"
          className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white font-bold rounded-md p-3 hover:bg-blue-500 cursor-pointer flex items-center justify-center">
          Register
        </button>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span>Have an account?</span>
          <Link
            to="/login"
            className="font-semibold underline hover:text-blue-400"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
