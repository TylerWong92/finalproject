import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      profile page
      <h1>username : {username}</h1>
      <div>
        {listOfPosts.map((value, key) => {
          return (
            <div
              key={key}
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              <div>{value.title}</div>
              <div>{value.postText}</div>
              <div>{value.username}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
