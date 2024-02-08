import { useEffect, useState } from "react";
import CreateShortUrl from "./CreateShortUrl/CreateShortUrl";
import GetShortUrl from "./GetShortUrl/GetShortUrl";
import { useUrl } from "../../context/urlContext";

const UserDashboard = () => {

  const {isLogged} = useUrl();

  return (
    <>
      {isLogged ?
      <div className="min-h-[90vh] flex items-center justify-center p-2">
          <div className="flex flex-col gap-6 items-center bg-slate-200 rounded-lg border-[1px] border-gray-300 p-2 w-60">
            <div className="font-semibold">
              <span className="text-xl">Please Wait</span>
              <span className="inline-block animate-bounce ml-1 text-2xl">...</span>
            </div>
            <span className="inline-block w-16 h-16 border-4 border-white border-b-pink-600 rounded-full animate-spin"></span>
        </div> 
      </div>
      :
      <main className="flex flex-wrap justify-center gap-10 sm:px-24 px-2 py-8">
        <CreateShortUrl />
        <GetShortUrl />
    </main>}
    </>
  );
};

export default UserDashboard;
