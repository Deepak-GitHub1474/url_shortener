import { useUrl } from "../../../context/urlContext";
import { BASE_URL } from "../../../config/config";

import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import axios from "axios";

const GetShortUrl = () => {
  const [url, setUrl] = useState([]);
  const [updatedShortUrl, setUpdatedShortUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(null);

  const { user, refresh } = useUrl();

  axios.defaults.withCredentials = true;

  // Function to fetch updated data
  const fetchShortUrls = () => {
    axios
      .get(`${BASE_URL}/shorturls`, { withCredentials: true })
      .then((res) => {
        setUrl(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Get all shortUrl
  useEffect(() => {
    fetchShortUrls();
  }, [refresh]);

  // Redirect on original url
  const redirectToOriginalUrl = (shortUrl, originalURL) => {
      try {
        if (originalURL.startsWith("http://") || originalURL.startsWith("https://")) {
          window.open(originalURL, "_blank");
        } else {
          window.open(`https://${originalURL}`, "_blank");
        }
      } catch (error) {
        console.log(error);
      }
  };

  // Redirect on original url
  // const redirectToOriginalUrl = (shortUrl, originalURL) => {
  //   axios
  //     .get(`${BASE_URL}/${shortUrl}`, { withCredentials: true })
  //     .then((res) => {
  //       // console.log(res);
  //       let originalURL = res.data.originalURL;
  //       if (originalURL.startsWith("http://") || originalURL.startsWith("https://")) {
  //         window.open(originalURL, "_blank");
  //       } else {
  //         window.open(`https://${originalURL}`, "_blank");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  // Delete url
  const handleDelete = (id) => {
    axios
      .delete(`${BASE_URL}/deleteUrl/${id}`)
      .then((res) => {
        alert(res.data.msg);
        fetchShortUrls(); // Fetch updated data after successful deletion
      })
      .catch((err) => console.log(err));
  };

  // Update Url
  const handleEdit = (id, shortUrl) => {
    if (isUpdating === id) {
      setIsUpdating(null);
      axios
        .patch(`${BASE_URL}/updateUrl/${id}`, {
          shortUrl: updatedShortUrl,
        })
        .then((res) => {
          alert(res.data.msg);
          fetchShortUrls(); // Fetch updated data after successful update
        })
        .catch((err) => console.log(err));
    } else {
      setIsUpdating(id);
      setUpdatedShortUrl(shortUrl);
    }
  };

  // Function to handle textarea change
  const handleTextareaChange = (e) => {
    setUpdatedShortUrl(e.target.value);
  };

  return (
    <>
      {user.email ? (
        <div className="flex flex-col items-center gap-4 sm:w-[500px] w-[95vw] py-4 px-2 rounded-lg shadow-[0_0_1px_gray] overflow-hidden">
          <h1 className="font-bold text-3xl text-blue-500">All Short Url</h1>
          <p className=" font-light text-sm">
            Click below button to redirect on original url
          </p>
          {url.map((url) => (
            <div key={url._id} className=" flex gap-2">
              {isUpdating === url._id ? (
                <textarea
                  name="shortUrl"
                  value={updatedShortUrl}
                  onChange={handleTextareaChange}
                  className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] w-48 overflow-y-auto max-h-10 min-h-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                />
              ) : (
                <button
                  onClick={() => redirectToOriginalUrl(url.shortUrl, url.originalURL)}
                  className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500 cursor-pointer w-48"
                >
                  {url.shortUrl}
                </button>
              )}
              <button
                className="bg-red-600 text-white rounded-md p-2 hover:bg-red-500 cursor-pointer w-20"
                onClick={() => handleDelete(url._id)}
              >
                delete
              </button>
              <button
                className="bg-green-600 text-white rounded-md p-2 hover:bg-green-500 cursor-pointer w-20"
                onClick={() => handleEdit(url._id, url.shortUrl)}
              >
                {isUpdating === url._id ? "save" : "edit"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default GetShortUrl;
