import { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export const useInfoCotext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState( null
  );

  const [onlineUsers, setOnliseUsers] = useState([]);

  const exits = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    setCurrentUser,
    exits,
    onlineUsers,
    setOnliseUsers,
  };

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
