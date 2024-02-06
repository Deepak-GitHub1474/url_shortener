import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UrlProvider } from "./context/urlContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UrlProvider>
      <App />
    </UrlProvider>
  </BrowserRouter>
);
