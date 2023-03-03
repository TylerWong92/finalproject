import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  let { id } = useParams();
  return (
    <div>
      profile page
      <h1>username : {id}</h1>
      <div>list of post</div>
    </div>
  );
};

export default Profile;
