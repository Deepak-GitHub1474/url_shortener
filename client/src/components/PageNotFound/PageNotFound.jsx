import { useNavigate } from "react-router-dom";
import pageNotFound from "./pageNotFound.jpg";

function PageNotFound() {
    
  const navigate = useNavigate();

  function goback() {
    navigate(-1);
  }

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center gap-8 p-4">
      <img src={pageNotFound} alt="404-img" />
      <div className="" onClick={goback}>
        <button className="bg-blue-600 text-white font-bold rounded-md p-[0.7rem] hover:bg-blue-500 cursor-pointer flex items-center justify-center">
          Go Back
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
