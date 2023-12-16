import React from "react";
import "./Chat.css";
import { io } from "socket.io-client";

import { useInfoContext } from "../../context/Context";
import { Search } from "../../components/Search/Search";
import { useEffect } from "react";
import { getUserChats } from "../../api/chatRequests";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import Modal from "../../components/Modal/Modal";

const socket = io("http://localhost:4002");
const Chat = () => {
  const {
    exit,
    currentUser,
    chats,
    setChats,
    setCurrentChat,
    setOnlineUsers,
    open,
  } = useInfoContext();

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await getUserChats();
        setChats(res.data.chats);
      } catch (error) {
        console.log(error);
        if (error.response.data.message === "jwt expired") {
          exit();
        }
      }
    };

    getChats();
  }, [currentUser._id]);

  useEffect(() => {
    socket.emit("new-user-added", currentUser._id);

    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [currentUser._id]);

  return (
    <div className="chat-page">
      {/* Search and users lost */}
      <div className="left-side cssanimation blurInRight">
        <Search />
      </div>

      {/* Conversations */}
      <div className="middle-side cssanimation blurIn">
        <ChatBox />
      </div>

      {/* chat list */}
      <div className="right-side cssanimation blurInLeft  search-user">
        <div className="right-side-top">
          <h1>All chats</h1>
          <button>
            <span className="fa-solid fa-gear"></span>
          </button>
          <button
            onClick={() => {
              exit();
              socket.emit("exit", currentUser._id);
            }}
          >
            <span className="fa-solid fa-right-from-bracket"></span>
          </button>
        </div>

        <div className="chat-list">
          {chats.length > 0 ? (
            chats.map((chat) => {
              return (
                <div
                  onClick={() => setCurrentChat(chat)}
                  key={chat._id}
                  className="chat-item"
                >
                  <Conversation chat={chat} />
                </div>
              );
            })
          ) : (
            <h3>Chats not found!</h3>
          )}
        </div>
      </div>

      {open && <Modal />}
    </div>
  );
};

export default Chat;
