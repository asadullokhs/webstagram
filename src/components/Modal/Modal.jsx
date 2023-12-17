import React from "react";
import "./Modal.css";
import { useInfoContext } from "../../context/Context";
import profile from "../../images/default-profile.jpg";
import cover from "../../images/cover.jpg";

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
          <div className="modal-content">
            <img
              className="coverPicture"
              src={
                userInfo?.coverPicture
                  ? `http://localhost:4002/${userInfo?.coverPicture} `
                  : cover
              }
              alt="cover-picture"
            />
            <img
              className="profile-image"
              src={
                userInfo?.profilePicture
                  ? `http://localhost:4002/${userInfo?.profilePicture} `
                  : profile
              }
              alt="rasm"
            />
            <div className="info">
              <h1 className="name-modal">
                {userInfo?.firstName} {userInfo?.lastName}
              </h1>
              <p className="email">Email: {userInfo?.email}</p>
              <p className="about">About: {userInfo?.about}</p>
              <p className="livesIn"> Lives In: {userInfo?.livesIn}</p>
              <p className="country"> Country: {userInfo?.country}</p>
              <p className="works-at"> Works At: {userInfo?.worksAt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
