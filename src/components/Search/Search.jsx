import React, { useEffect, useState } from "react";
import { useInfoContext } from "../../context/Context";
import "./Search.css";
import Logo from "../../images/logo.jpg";
import { getAllUsers } from "../../api/userRequests";

import { toast } from "react-toastify";
import { Users } from "../Users/Users";

export const Search = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // getAllUsers
  useEffect(() => {
    const getUsers = async () => {
      try {
        toast.loading("Please wait...");
        const res = await getAllUsers();
        toast.dismiss();
        setUsers(res.data.users);
      } catch (error) {
        toast.dismiss();
        toast.error(error?.response?.data.message);
      }
    };

    getUsers();
  }, [loading]);

  // Search user
  const searchUser = (e) => {
    if (e.target.value) {
      const result = users.filter(({ firstName, lastName }) => {
        const test = `${firstName} ${lastName}`.toLowerCase();
        let authorName = firstName.toLowerCase();
        let name = lastName.toLowerCase();
        return (
          (test.includes(e.target.value.toLowerCase()) &&
            authorName.startsWith(e.target.value.toLowerCase())) ||
          name.startsWith(e.target.value.toLowerCase())
        );
      });
      setUsers(result);
    } else {
      setLoading(!loading);
    }
  };

  return (
    <div className="search-user">
      <div className="search-box">
        <img width={40} className="logo-app" src={Logo} alt="logo_app" />
        <div className="search-input-box">
          <input
            onChange={searchUser}
            type="text"
            className="search-input"
            placeholder="search"
            name="name"
          />
          <i class="fa-solid fa-magnifying-glass search-img"></i>
        </div>
      </div>
      <h1>All users</h1>
      <Users users={users} />
    </div>
  );
};
