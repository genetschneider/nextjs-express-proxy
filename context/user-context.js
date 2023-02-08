import React, { useContext, useEffect, useState } from "react";

export const UserContext = React.createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch("/api/user");
        const userData = await resp.json();

        setUser(userData);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
