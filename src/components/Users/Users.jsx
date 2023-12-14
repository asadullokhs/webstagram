import React from "react";
import { useInfoContext } from "../../context/Context";
import "./Users.css";

import message from "../../images/message.jpg";
import profile from "../../images/default-profile.jpg";

export const Users = ({ users }) => {
  const { currentUser, onlineUsers } = useInfoContext();

  const online = (userId) => {
    const onlineUser = onlineUsers.find((user) => user.userId === userId);

    return onlineUser ? true : false;
  };

  return (
    <div className="user-list">
      {users.map((user) => {
        if (user._id !== currentUser._id) {
          return (
            <div key={user._id}>
              <div className="user-info-box">
                <div
                  className={online(user._id) ? "online-dot" : "offline-dot"}
                ></div>
                <img
                  className="profile-img"
                  src={
                    user?.profilePicture
                      ? `http://localhost:4002/${user?.profilePicture}`
                      : profile
                  }
                  alt="profile-img"
                />
                <div className="middle-content">
                  <h4 className="name">{user?.firstName}</h4>
                  <span
                    className={online(user._id) ? "status" : "offline-status"}
                  >
                    {online(user._id) ? "online" : "offline"}
                  </span>
                </div>
                <button className="msg-btn button">
                  <img width={20} src={message} alt="message__icon" />
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
