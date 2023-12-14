import React from "react";
import { useInfoContext } from "./context/Context";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const { currentUser } = useInfoContext();

  return (
    <div className="App">
      {currentUser ? <Chat /> : <Auth />}

      <ToastContainer />
      <div className="blur"></div>
      <div className="blur blur-2"></div>
    </div>
  );
};

export default App;
