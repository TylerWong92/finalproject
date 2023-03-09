import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Card from "../components/Card";
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
        window.location.reload();

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
        window.location.reload();
        if (response.data.error) {
          alert("User Not Login");
        }
      });
  };

  return (
    <div>
      profile page
      <h1>username : {username}</h1>
      <div className="flex flex-wrap justify-center gap-4 p-32">
        {listOfPosts.map((value, key) => {
          const buffer = Buffer.from(value.image, "base64");
          return (
            <div
              className="card card-compact w-96 bg-base-100 shadow-xl"
              key={key}
            >
              <div
                onClick={() => {
                  console.log(value.id);
                  setPostId(value.id);
                }}
              >
                {
                  <img
                    onClick={() => {
                      navigate(`/post/${value.id}`);
                    }}
                    className="w-full"
                    src={buffer}
                  />
                }
                {value.title}
              </div>
              <div>{value.postText}</div>
              <div>{value.username}</div>
              <div>
                {authState.id === value.UserId && (
                  <div>
                    <label
                      htmlFor="my-modal"
                      className="btn"
                      onClick={() => {
                        console.log(value.id);
                        setPostId(value.id);
                      }}
                    >
                      open modal
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal"
                      className="modal-toggle"
                    />
                    <div className="modal">
                      <div className="modal-box">
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
                        <div className="modal-action">
                          <label
                            htmlFor="my-modal"
                            className="btn"
                            type="submit"
                            onClick={() => {
                              handleUpdate(postId, newTitle, newPostText);
                            }}
                          >
                            Yay!
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="flex flex-wrap justify-center gap-4 p-32">
          {listOfImages.map((value, key) => {
            const buffer = Buffer.from(value.data.data, "base64");

            return (
              <div
                className="card card-compact w-96 bg-base-100 shadow-xl"
                key={key}
              >
                {authState.id === value.UserId && (
                  <React.Fragment>
                    <img className="w-full" src={buffer} />
                    <div>
                      <button
                        className="btn"
                        onClick={() => {
                          navigate(`/CreatePost/${value.id}`);
                        }}
                      >
                        Post
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          handleDelete(value.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </React.Fragment>
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

// <form>
//   <input
//     type="text"
//     onChange={(event) => {
//       setNewTitle(event.target.value);
//     }}
//   />
//   <input
//     type="text"
//     onChange={(event) => {
//       setNewPostText(event.target.value);
//     }}
//   />
//   <button
//     type="submit"
//     onClick={() => {
//       handleUpdate(postId, newTitle, newPostText);
//     }}
//   >
//     Updated
//   </button>
// </form>;
