import React, { useState } from "react";
import "./Auth.css";

import Logo from "../../images/logo.jpg";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);

  const [confirmPass, setConfirmPass] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);

    console.log(fromData.get("password"));
    console.log(fromData.get("confirmPassword"));
  };

  return (
    <div className="auth">
      <div className="auth-left">
        <img src={Logo} alt="logo" className="logo-img" />
        <div className="app-name">
          <h1>JS Media App</h1>
          <h6>Explore with WEBSTAR IT ACADEMY</h6>
        </div>
      </div>
      <div className="auth-right">
        <form onSubmit={handleSubmit} action="" className="auth-form">
          <h3>{isSignup ? "Login" : "Signup"}</h3>

          {!isSignup && (
            <>
              <div>
                <input
                  type="text"
                  name="firstname"
                  className="info-input"
                  placeholder="Enter your firstname"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastname"
                  className="info-input"
                  placeholder="Enter your lastname"
                  required
                />
              </div>
            </>
          )}
          <div>
            <input
              type="email"
              name="email"
              className="info-input"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="info-input"
              placeholder="Enter your password"
              required
            />
          </div>
          {!isSignup && (
            <div>
              <input
                type="password"
                name="confirmPassword"
                className="info-input"
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {!confirmPass && (
            <span className="confirm-span">*Confirm password is not same</span>
          )}

          <div>
            <span onClick={() => setIsSignup(!isSignup)} className="info-span">
              {!isSignup
                ? "Already have an account Login"
                : "Don't have an account Signup"}
            </span>
            <button className="info-btn button">
              {isSignup ? "Login" : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
