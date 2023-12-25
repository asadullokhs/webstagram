import React from "react";
import { useInfoContext } from "../../context/Context";
import profile from "../../images/default-profile.jpg";
import cover from "../../images/cover.jpg";
import "./Settings.css";
import { updateUser } from "../../api/userRequests";
import { toast } from "react-toastify";

const Settings = () => {
  const { setSettings, currentUser, setCurrentUser, serverUrl, exit } =
    useInfoContext();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setSettings(true);
      const formData = new FormData(e.target);
      const { data } = await updateUser(currentUser._id, formData);
      setCurrentUser(data?.user);
      localStorage.setItem("profile", JSON.stringify(data?.user));
      setSettings(false);
      toast.success("Succesfully updated");
    } catch (error) {
      setSettings(false);
      if (error?.response?.data.message === "jwt expired") {
        exit();
      }
    }
  };
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
                ? `${serverUrl}/${currentUser?.coverPicture} `
                : cover
            }
            alt="cover-picture"
          />
          <img
            className="profile-image"
            src={
              currentUser?.profilePicture
                ? `${serverUrl}/${currentUser?.profilePicture} `
                : profile
            }
            alt="rasm"
          />
          <form onSubmit={handleForm} className="form-settings">
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
            <label htmlFor="profileImg">
              Profile Image
              <input
                id="profileImg"
                type="file"
                style={{ display: "none" }}
                name="profilePicture"
                placeholder="profile Image"
              />
            </label>
            <label htmlFor="coverImg">
              Cover Image
              <input
                id="coverImg"
                type="file"
                style={{ display: "none" }}
                name="coverPicture"
                placeholder="cover Image"
              />
            </label>
            <button className="setting-button">Save changes</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
