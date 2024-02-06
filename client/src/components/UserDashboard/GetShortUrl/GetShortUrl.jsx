import { useUrl } from "../../../context/urlContext";
import { BASE_URL } from "../../../config/config";

import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import axios from "axios";

const GetShortUrl = () => {
  const [url, setUrl] = useState([]);
  const { user } = useUrl();

  axios.defaults.withCredentials = true;

  // Get all shortUrl
  useEffect(() => {
    axios
      .get(`${BASE_URL}/shorturls`, { withCredentials: true })
      .then((res) => {
        setUrl(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Redirect on original url
  const redirectToOriginalUrl = (shortUrl) => {
    window.open(`${BASE_URL}/${shortUrl}`, "_blank");
  };

   // Delete url
   function handleDelete(id) {
    axios
      .delete(`${BASE_URL}/url/${id}`)
      .then((res) => {
        alert(res.data.msg)
      })
      .catch((err) => console.log(err));
  }


  return (
    <>
      {user.email ? 
      <div className="flex flex-col items-center gap-4 sm:w-[500px] w-[95vw] py-4 px-2 rounded-lg shadow-[0_0_1px_gray] overflow-hidden">
        <h1 className="font-bold text-3xl text-blue-500">All Short Url</h1>
        <p className=" font-light text-sm">Click below button to redirect on original url</p>
        {url.map((url) => (
          <div key={url._id} className=" flex gap-2">
            <button 
              onClick={() => redirectToOriginalUrl(url.shortUrl)} 
              className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500 cursor-pointer w-48"
            >
              {url.shortUrl}
            </button>
            <button 
              className="bg-red-600 text-white rounded-md p-2 hover:bg-red-500 cursor-pointer w-fit"
              onClick={() => handleDelete(url._id)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
    :
    <Navigate to="/login" />}
    </>
  );
};

export default GetShortUrl;
