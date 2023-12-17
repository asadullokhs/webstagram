import React from "react";
import "./Modal.css";
import { useInfoContext } from "../../context/Context";
import profile from "../../images/default-profile.jpg";

const Modal = () => {
  const { setOpen, userInfo } = useInfoContext();

  return (
    <div>
      <div className="modal-box">
        <div className="modal-body">
          <div className="modal-header">
            <h2>User's info</h2>
            <button
              className="btn"
              onClick={() => setOpen(false)}
              type="button"
            >
              &#10005;
            </button>
          </div>
          <div className="flex-content">
            <img
              src={
                userInfo?.profilePicture
                  ? `http://localhost:4002/${userInfo?.profilePicture} `
                  : profile
              }
              alt="rasm"
            />
            <div className="info">
              <h1 className="name">
                {userInfo?.firstName} {userInfo?.lastName}
              </h1>
              <span>{userInfo?.email}</span>
              <p className="about">{userInfo?.about}</p>
              <p className="livesIn">{userInfo?.livesIn}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
