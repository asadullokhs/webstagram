import React from "react";
import { useInfoCotext } from "./context/Context";
import Auth from "./pages/Auth/Auth";
import Chat from "./pages/Chat/Chat";

import "./App.css";

const App = () => {
  const { currentUser } = useInfoCotext();
  return <div className="App">
    {
      currentUser ? <Chat /> : <Auth />
    }

    <div className="blur"></div>
    <div className="blur"></div>
  </div>;
};

export default App;
