import React from "react";
import "./Modal.css";
import { useInfoContext } from "../../context/Context";
import profile from "../../images/default-profile.jpg";

const Modal = () => {
  const { setOpen, userData, setUserData } = useInfoContext();

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const { data } = await getUser(userId);
  //       setUserData(data.user);
  //     } catch (error) {
  //       if (error.response.data.message === "jwt expired") {
  //         exit();
  //       }
  //     }
  //   };
  //   if (currentChat) {
  //     getUserData();
  //   }
  // }, [userId]);

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
                userData?.profilePicture
                  ? `http://localhost:4002/${userData?.profilePicture} `
                  : profile
              }
              alt="rasm"
            />
            <div className="info">
              <h1 className="name">
                {userData?.firstName} {userData?.lastName}
              </h1>
              <span>{userData?.email}</span>
              <p className="about">{userData?.about}</p>
              <p className="livesIn">{userData?.livesIn}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
