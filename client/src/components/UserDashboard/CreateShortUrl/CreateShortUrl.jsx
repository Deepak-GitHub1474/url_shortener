import { useUrl } from "../../../context/urlContext";
import { BASE_URL } from "../../../config/config";

import { useState } from "react";

import { Navigate } from "react-router-dom";
import axios from "axios";

const CreateShortUrl = () => {

  const [url, setUrl] = useState("");
  const { user, updateDashBoard } = useUrl();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/originalUrl`, { url, email:user.email })
      .then((res) => {
        alert(`${res.data.msg}: ${res.data.shortUrl}`);
        updateDashBoard();
        setUrl("");
      })
      .catch((err) => {
        alert(err.response.data.msg);
        console.log(err);
      });
  };

  return (
    <>
      {user.email ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:w-[500px] w-[95vw] max-h-60 py-4 px-2 rounded-lg shadow-[0_0_1px_gray] relative overflow-hidden">
                <h1 className="text-center font-bold sm:text-3xl text-xl text-blue-500 mb-2">Create Short URL</h1>
                <input 
                    required
                    type="text" 
                    name="url" 
                    placeholder="url" 
                    className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray]" 
                    onChange={e => setUrl(e.target.value)}
                    value={url}
                />
                <button className="bg-blue-600 text-white font-bold rounded-md p-[0.7rem] hover:bg-blue-500 cursor-pointer flex items-center justify-center">
                    Send
                </button>
            </form>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default CreateShortUrl;
