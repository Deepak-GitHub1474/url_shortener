import { useUrl } from "../../context/urlContext";
import { BASE_URL } from "../../config/config";

import { useEffect, useState } from "react";

import axios from "axios";

const LandingPage = () => {

  const [url, setUrl] = useState([]);
  const { refresh, updateDashBoard } = useUrl();

  // Get all shortUrl
  useEffect(() => {
    axios
      .get(`${BASE_URL}/shorturls`, { withCredentials: true })
      .then((res) => {
        setUrl(res.data);
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  // Redirect on original url
  const redirectToOriginalUrl = (shortUrl) => {
    axios
      .get(`${BASE_URL}/${shortUrl}`, { withCredentials: true })
      .then((res) => {
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

  return (
    <main className=" min-h-[90vh] flex flex-col items-center justify-center gap-10 sm:px-24 px-2 py-8">
      <div className="flex items-center justify-center flex-wrap gap-10 p-2">
        {url.map((url) => (
          <div key={url._id} 
            className="flex items-center gap-10 bg-slate-200 min-h-36 max-h-64 p-4 
             max-w-3xl px-5 py-4 rounded-lg border border-transparent
            border-gray-300 hover:bg-slate-100 hover:bg-opacity-50"
          >
            <div className="flex flex-col items-center gap-2">
              <h1 className="font-semibold">Short URL</h1>
              <button
                onClick={() => redirectToOriginalUrl(url.shortUrl)}
                className="bg-blue-600 text-white rounded-md p-2 text-sm hover:bg-blue-500 cursor-pointer min-w-36"
              >
                {url.shortUrl}
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              <h1 className="font-semibold">Number of click</h1>
              <p className="max-w-32 min-w-20 bg-slate-100 p-2 text-center overflow-auto font-semibold border border-transparent
            border-gray-300 rounded-md">
                {url.clickRecords.length}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default LandingPage;
