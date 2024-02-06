import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config.js";

// create context
const UrlContext = createContext();

// use context
export const useUrl = () => {
    return useContext(UrlContext);
}

// context provider
export const UrlProvider= ({children}) => {
    const [user, setUser] = useState({
        username: null,
        email: null
    })

    axios.defaults.withCredentials = true; // Global Credential

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`${BASE_URL}/`);
            setUser(response.data);
          } catch (err) {
            console.log(err);
          }
        };
      
        fetchUser();
      }, []);

    return (
        <UrlContext.Provider value={{ user }} >
          {children}
        </UrlContext.Provider>
      );
}