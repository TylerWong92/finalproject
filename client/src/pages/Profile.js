import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
const { Buffer } = require("buffer");

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
    await axios
      .delete(`http://localhost:3001/image/${data}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        console.log(authState);
        if (response.data.error) {
          alert("User Not Login");
        }
      });
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
            const buffer = Buffer.from(value.data.data, "base64");

            return (
              <div key={key}>
                <div
                  onClick={() => {
                    navigate(`/CreatePost/${value.id}`);
                  }}
                >
                  <div>{value.id}</div>

                  <img src={buffer} />
                </div>

                {authState.id === value.UserId && (
                  <button
                    onClick={() => {
                      handleDelete(value.id);
                    }}
                  >
                    DELETE With Auth
                  </button>
                )}

                <div>{authState.id}</div>
                <div>{value.UserId}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
