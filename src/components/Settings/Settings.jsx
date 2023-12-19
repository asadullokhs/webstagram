import React from "react";
import { useInfoContext } from "../../context/Context";
import profile from "../../images/default-profile.jpg";
import cover from "../../images/cover.jpg";

const Settings = () => {
  const { setSettings, currentUser } = useInfoContext();
  return (
    <div className="modal-box">
      <div className="modal-body">
        <div className="modal-header">
          <h2>Edit </h2>
          <button
            className="btn"
            onClick={() => setSettings(false)}
            type="button"
          >
            &#10005;
          </button>
        </div>
        <div className="modal-content">
          <img
            className="coverPicture"
            src={
              currentUser?.coverPicture
                ? `http://localhost:4002/${currentUser?.coverPicture} `
                : cover
            }
            alt="cover-picture"
          />
          <img
            className="profile-image"
            src={
              currentUser?.profilePicture
                ? `http://localhost:4002/${currentUser?.profilePicture} `
                : profile
            }
            alt="rasm"
          />
          <form className="form-settings">
            <input
              type="text"
              name="firstName"
              defaultValue={currentUser?.firstName}
            />
            <input
              type="text"
              name="lastName"
              defaultValue={currentUser?.lastName}
            />
            <input
              type="email"
              name="email"
              defaultValue={currentUser?.email}
            />
            <input
              type="text"
              name="about"
              placeholder="Something about you..."
              defaultValue={currentUser?.about}
            />
            <input
              type="text"
              name="livesIn"
              placeholder="Where do you live..."
              defaultValue={currentUser?.livesIn}
            />
            <input
              type="text"
              name="country"
              defaultValue={currentUser?.country}
              placeholder="Where was you born..."
            />
            <input
              type="text"
              name="worksAt"
              placeholder="What is your job..."
              defaultValue={currentUser?.worksAt}
            />
            <input
              type="text"
              name="relationship"
              placeholder="Who is your wife/husband..."
              defaultValue={currentUser?.relationship}
            />
            <button className="setting-button">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
