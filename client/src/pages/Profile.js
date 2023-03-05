import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Profile = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfImages, setListOfImages] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
    axios.get(`http://localhost:3001/image/byuserId/${id}`).then((response) => {
      setListOfImages(response.data);
    });
    // eslint-disable-next-line
  }, []);

  const handleDelete = async (data) => {
    console.log(data);
    await axios.delete(`http://localhost:3001/image/${data}`, data);
    // .then((response) => {
    //   if (response.data.error) {
    //     alert("User Not Login");
    //   } else {
    //     navigate("/");
    //   }
    // });
  };

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
        <div>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <div>
          {listOfImages.map((value, key) => {
            return (
              <div key={key}>
                <div
                  onClick={() => {
                    navigate(`/CreatePost/${value.id}`);
                  }}
                >
                  <div>{value.id}</div>
                </div>
                <button
                  onClick={() => {
                    handleDelete(value.id);
                  }}
                >
                  DELETE
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// <button
// onClick={() => {
//   navigate(`/post/CreatePost/${value.id}`);
// }}
// ></button>
