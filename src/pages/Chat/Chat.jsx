import React, { useState } from "react";
import "./Chat.css";
import { io } from "socket.io-client";

import { useInfoContext } from "../../context/Context";
import { Search } from "../../components/Search/Search";
import { useEffect } from "react";
import { getUserChats } from "../../api/chatRequests";
import Conversation from "../../components/Conversation/Conversation";
import ChatBox from "../../components/ChatBox/ChatBox";
import Modal from "../../components/Modal/Modal";
import chatImg from "../../images/chat.jpg";
import Settings from "../../components/Settings/Settings";

const socket = io("https://chat-app-c0b7.onrender.com");
const Chat = () => {
  const {
    exit,
    currentUser,
    chats,
    setChats,
    setCurrentChat,
    setOnlineUsers,
    open,
    currentChat,
    settings,
    setSettings,
  } = useInfoContext();

  const [sendMessage, setSendMessage] = useState(null);
  const [answerMessage, setAnswerMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const res = await getUserChats();
        setChats(res.data.chats);
      } catch (error) {
        if (error?.response?.data.message === "jwt expired") {
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

  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.on("answer-message", (data) => {
      setAnswerMessage(data);
    });
  }, []);

  return (
    <div className="chat-page">
      {/* Search and users lost */}
      <div className="left-side cssanimation blurInRight">
        <Search />
      </div>

      {/* Conversations */}
      <div className="middle-side cssanimation blurIn">
        {currentChat ? (
          <ChatBox
            setSendMessage={setSendMessage}
            answerMessage={answerMessage}
          />
        ) : (
          <>
            <img
              className="chat-img"
              width={250}
              style={{
                borderRadius: "50%",
              }}
              src={chatImg}
              alt="not found"
            />
            <h2 className="chat-title">There's no chat yet</h2>
          </>
        )}
      </div>

      {/* chat list */}
      <div className="right-side cssanimation blurInLeft  search-user">
        <div className="right-side-top">
          <h1>All chats</h1>
          <button
            onClick={() => {
              setSettings(true);
            }}
          >
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
      {settings && <Settings />}
    </div>
  );
};

export default Chat;
