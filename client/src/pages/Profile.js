import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  let { id } = useParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
  }, []);
  return (
    <div>
      profile page
      <h1>username : {username}</h1>
      <div>list of post</div>
    </div>
  );
};

export default Profile;
