import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { useInfoContext } from "../../context/Context";
import { getUser } from "../../api/userRequests";
import profile from "../../images/default-profile.jpg";
import { getMessages } from "../../api/messageRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
  const { currentUser, currentChat, exit, setOpen, userData, setUserData } =
    useInfoContext();
  const [messages, setMessages] = useState([]);

  const imageRef = useRef();

  const userId = currentChat?.members?.find((id) => id !== currentUser._id);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data.user);
      } catch (error) {
        if (error.response.data.message === "jwt expired") {
          exit();
        }
      }
    };
    if (currentChat) {
      getUserData();
    }
  }, [userId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(currentChat._id);

        setMessages(data.messages);
        console.log(data);
      } catch (error) {
        if (error.response.data.message === "jwt expired") {
          exit();
        }
      }
    };

    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  return (
    <div className="chat-box">
      <div className="user-info">
        <img
          className="profile-img"
          onClick={() => {
            setOpen(true);
          }}
          src={
            userData?.profilePicture
              ? `http://localhost:4002/${userData?.profilePicture}`
              : profile
          }
          alt="rasm"
        />
        <h3 className="name">
          {userData?.firstName} {"       "}
          {userData?.lastName}
        </h3>
      </div>
      <hr />

      <div className="chat-body">
        {messages?.map((message) => {
          return (
            <div
              key={message._id}
              className={
                message?.senderId === currentUser._id
                  ? "message own"
                  : "message"
              }
            >
              <span className="message-text">{message?.text}</span>
              <span className="message-date">{format(message?.createdAt)}</span>
            </div>
          );
        })}
      </div>
      <div className="chat-sender">
        <div className="sender-file-btn button fa-solid fa-file"></div>
        <InputEmoji />
        <button className="send-btn button fa-solid fa-paper-plane"></button>
        <input
          ref={imageRef}
          name="image"
          type="file"
          className="message-file-input"
        />
      </div>
    </div>
  );
};

export default ChatBox;
