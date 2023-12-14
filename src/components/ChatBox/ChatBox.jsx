import React, { useEffect, useState } from "react";
import "./ChatBox.css";
import { useInfoContext } from "../../context/Context";
import { getUser } from "../../api/userRequests";
import profile from "../../images/default-profile.jpg";
import { getMessages } from "../../api/messageRequests";

const ChatBox = () => {
  const { currentUser, currentChat, exit } = useInfoContext();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);

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
      <h1>Chat</h1>
    </div>
  );
};

export default ChatBox;
