import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { useInfoContext } from "../../context/Context";
import { getUser } from "../../api/userRequests";
import profile from "../../images/default-profile.jpg";
import { addMessage, getMessages } from "../../api/messageRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";

const ChatBox = ({ setSendMessage, answerMessage }) => {
  const { currentUser, currentChat, exit, setOpen, setUserInfo, serverUrl } =
    useInfoContext();
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);

  const [textMessage, setTextMessage] = useState("");

  let imageRef = useRef();
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleSend = async () => {
    const formDate = new FormData();
    formDate.append("senderId", currentUser._id);
    formDate.append("text", textMessage);
    formDate.append("chatId", currentChat._id);
    formDate.append("createdAt", new Date().getTime());

    formDate.append("file", imageRef.current.files[0]);

    if (textMessage === "" && imageRef.current.value == "") {
      toast.error("Text is required");
      return;
    }

    setSendMessage({ ...formDate, receivedId: userId });

    try {
      const { data } = await addMessage(formDate);
      setMessages([...messages, data.message]);

      setTextMessage("");

      imageRef.current.value = null;
      formDate.delete("file");
    } catch (error) {
      if (error?.response?.data.message === "jwt expired") {
        exit();
      }
    }
  };

  useEffect(() => {
    if (
      currentChat &&
      answerMessage !== null &&
      answerMessage.chatId === currentChat._id
    ) {
      setMessages([...messages, answerMessage]);
    }
  }, [answerMessage]);

  const handleText = (textMessage) => {
    setTextMessage(textMessage);
  };

  return (
    <div className="chat-box">
      <div className="user-info">
        <img
          className="profile-img"
          onClick={() => {
            setOpen(true);
            setUserInfo(userData);
          }}
          src={
            userData?.profilePicture
              ? `${serverUrl}/${userData?.profilePicture}`
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
              ref={scroll}
              key={message._id}
              className={
                message?.senderId === currentUser._id
                  ? "message own"
                  : "message"
              }
            >
              <span className="message-text">{message?.text}</span>
              {message?.file !== "undefined" ? (
                <img
                  className="file-message"
                  src={`${serverUrl}/${message?.file}`}
                  alt={message?.text}
                />
              ) : (
                <></>
              )}
              <span className="message-date">{format(message?.createdAt)}</span>
            </div>
          );
        })}
      </div>
      <div className="chat-sender">
        <div
          onClick={() => {
            imageRef?.current?.click();
          }}
          className="sender-file-btn button fa-solid fa-file"
        ></div>
        <InputEmoji keepOpened value={textMessage} onChange={handleText} />
        <button
          onClick={handleSend}
          className="send-btn button fa-solid fa-paper-plane"
        ></button>
        <input
          ref={imageRef}
          name="file"
          type="file"
          className="message-file-input"
        />
      </div>
    </div>
  );
};

export default ChatBox;
