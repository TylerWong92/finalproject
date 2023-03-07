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
  const [newTitle, setNewTitle] = useState("");
  const [newPostText, setNewPostText] = useState("");
  const [postId, setPostId] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3001/posts/gallery/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
    axios.get(`http://localhost:3001/image/gallery/${id}`).then((response) => {
      setListOfImages(response.data);
    });
    // eslint-disable-next-line
  }, []);

  // const handleUpdate = async (data) => {
  //   data = { title: newTitle, postText: newPostText };
  //   await axios
  //     .put(
  //   `http://localhost:3001/posts/${postId}`,
  //   { data },
  //   {
  //     headers: {
  //       accessToken: localStorage.getItem("accessToken"),
  //     },
  //   }
  // )
  // .then((response) => {
  //   console.log(authState);
  //   if (response.data.error) {
  //     alert("User Not Login");
  //   }
  // });
  // };

  const handleUpdate = async (postId, newTitle, newPostText) => {
    const data = { title: newTitle, postText: newPostText };
    await axios
      .put(
        `http://localhost:3001/posts/${postId}`,
        { data },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(authState);
        if (response.data.error) {
          alert("User Not Login");
        }
      });
  };

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
          const buffer = Buffer.from(value.image, "base64");
          return (
            <div key={key}>
              <div
                onClick={() => {
                  console.log(value.id);
                  setPostId(value.id);
                }}
              >
                {value.title}
              </div>
              <div>{value.postText}</div>
              <div>{value.username}</div>
              <div
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
                className="imgbox"
              >
                {<img src={buffer} />}
              </div>
            </div>
          );
        })}
        <form>
          <input
            type="text"
            onChange={(event) => {
              setNewTitle(event.target.value);
            }}
          />
          <input
            type="text"
            onChange={(event) => {
              setNewPostText(event.target.value);
            }}
          />
          <button
            type="submit"
            onClick={() => {
              handleUpdate(postId, newTitle, newPostText);
            }}
          >
            Updated
          </button>
        </form>
        <div>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <div>
          {listOfImages.map((value, key) => {
            const buffer = Buffer.from(value.data.data, "base64");

            return (
              <div key={key}>
                <div>
                  {authState.id === value.UserId && (
                    <button
                      onClick={() => {
                        navigate(`/CreatePost/${value.id}`);
                      }}
                    >
                      {value.id + "click here to post this img"}
                    </button>
                  )}

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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
