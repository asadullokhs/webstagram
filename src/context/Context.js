import { createContext, useContext, useState } from "react";

const InfoContext = createContext();

export const useInfoContext = () => useContext(InfoContext);

export const InfoProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("profile") || null)
  );

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const exit = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    setCurrentUser,
    exit,
    onlineUsers,
    setOnlineUsers,
    chats,
    setChats,
    currentChat,
    setCurrentChat,
    open,
    setOpen,
    userData,
    setUserData,
  };

  return (
    <InfoContext.Provider value={value}>
      <InfoContext.Consumer>{() => children}</InfoContext.Consumer>
    </InfoContext.Provider>
  );
};
