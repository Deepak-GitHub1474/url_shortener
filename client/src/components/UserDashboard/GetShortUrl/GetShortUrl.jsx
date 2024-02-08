import { useUrl } from "../../../context/urlContext";
import { BASE_URL } from "../../../config/config";

import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";
import axios from "axios";

const GetShortUrl = () => {
  const [url, setUrl] = useState([]);
  const [updatedShortUrl, setUpdatedShortUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);

  const { user, refresh, updateDashBoard } = useUrl();

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

  // Filter User Url to control crud operation securely
  const filterUserUrls = url.filter(url => url.userEmail === user.email);

  // Redirect on original url
  const redirectToOriginalUrl = (shortUrl) => {
    axios
      .get(`${BASE_URL}/${shortUrl}`, { withCredentials: true })
      .then((res) => {
        // console.log(res);
        let originalURL = res.data.originalURL;
        if (originalURL.startsWith("http://") || originalURL.startsWith("https://")) {
          window.open(originalURL, "_blank");
          updateDashBoard();
        } else {
          window.open(`https://${originalURL}`, "_blank");
          updateDashBoard();
        }
      })
      .catch((err) => console.log(err));
  };

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
      {user?.email ? (
        <div className="flex flex-col items-center gap-4 sm:w-[500px] w-[95vw] py-4 px-2 rounded-lg shadow-[0_0_1px_gray] overflow-hidden relative">
          {filterUserUrls.length > 0 && 
          <div className="flex flex-col items-center gap-4">
            <h1 
              className={`font-bold sm:text-3xl text-xl ${isAnalyticsOpen ? "text-pink-600": "text-blue-500"}`}>
                {!isAnalyticsOpen ? "All Short URL" : "Number of times each URL clicked"}
            </h1>
            <button 
              onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)} 
              className="bg-pink-600 text-white rounded-md py-2 px-4 hover:bg-pink-500 cursor-pointer w-fit">
              {isAnalyticsOpen ? "Close Analytics" : "Open Analytics"}
            </button>
          </div>}
          <div className="text-sm">
            {filterUserUrls.length > 0 ?
            <span>Click first button to redirect on original URL</span>
            :
            <span>No URL found, create your short URL</span>
            }
          </div>
          {filterUserUrls.map((url) => (
            <div key={url._id} className=" flex gap-4">
                <>
                  {isUpdating === url._id ? (
                    <textarea
                      name="shortUrl"
                      value={updatedShortUrl}
                      onChange={handleTextareaChange}
                      className="p-3 rounded-md border-none outline-none shadow-[0_0_1px_gray] w-36 overflow-y-auto max-h-10 min-h-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    />
                  ) : (
                    <button
                      onClick={() =>
                        redirectToOriginalUrl(url.shortUrl)
                      }
                      className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-500 cursor-pointer w-36"
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
                </>
            </div>
          ))}
          {isAnalyticsOpen &&
          <div className="relative bottom-0 z-50 bg-white flex flex-col items-center gap-4 sm:w-[450px] w-[95vw] max-h-80 min-h-80 py-4 px-2 rounded-lg overflow-y-auto ">
              
              <button 
                onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)} 
                className="bg-pink-600 text-white rounded-full p-2 hover:bg-pink-500 cursor-pointer w-10 h-10 text-center font-bold absolute left-1 top-1 z-50">
                X
              </button>
              
              <div className="flex items-center mt-10">
                <p className="w-[14.5rem] font-semibold bg-sky-100 p-2">Short URL</p>
                <p className="font-semibold bg-sky-100 p-2">Total Click</p>
              </div>
              {filterUserUrls.map(url => (
                <div key={url._id} className="flex items-center">
                  <p className="w-[15rem] bg-pink-50 p-2 text-gray-600">{url.shortUrl}</p>
                  <p className="max-w-20 min-w-20 bg-pink-50 p-2 text-gray-600 text-center overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">{url.clickRecords.length}</p>
                </div>
              ))}
          </div>}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default GetShortUrl;
