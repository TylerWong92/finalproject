import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
const { Buffer } = require("buffer");

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [picture, setPicture] = useState("");
  const { authState } = useContext(AuthContext);

  // For redirect pages after action
  let navigate = useNavigate();

  // Get Single Post by Id and also fetch their users comments.
  // useEffect(() => {
  //   let pictureid;
  //   axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
  //     setPostObject(response.data);
  //     pictureid = response.data.PictureId;
  //   });

  //   axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
  //     setComments(response.data);
  //   });

  //   console.log(pictureid);
  //   axios
  //     .get(`http://localhost:3001/image/byImageId/${10}`)
  //     .then((response) => {
  //       const buffer = Buffer.from(response.data, "base64");
  //       setPicture(buffer);
  //     });
  //   // eslint-disable-next-line
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          `http://localhost:3001/posts/byId/${id}`
        );
        setPostObject(response1.data);
        const pictureid = response1.data.PictureId;

        const response2 = await axios.get(
          `http://localhost:3001/comments/${id}`
        );
        setComments(response2.data);

        const response3 = await axios.get(
          `http://localhost:3001/image/byImageId/${pictureid}`
        );

        const buffer = Buffer.from(response3.data, "base64");
        setPicture(buffer);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const addComment = async () => {
    await axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("User Not Login");
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3001/posts/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div>
      <h1 className="text-3xl">post-inner</h1>
      <div>{postObject.title}</div>
      <div>{postObject.postText}</div>

      <Link to={`/profile/${postObject.UserId}`}>{postObject.username}</Link>

      {authState.username === postObject.username && (
        <button
          onClick={() => {
            deletePost(postObject.id);
          }}
        >
          DELETE POST
        </button>
      )}

      <h1 className="text-3xl">Comments</h1>
      <input
        value={newComment}
        type="text"
        placeholder="comment..."
        onChange={(event) => {
          setNewComment(event.target.value);
        }}
      />
      <button onClick={addComment}>Submit Comment</button>
      {comments.map((comment, key) => {
        return (
          <div key={key}>
            <label>Username: {comment.username}</label>
            {comment.commentBody}
          </div>
        );
      })}
      <div className="imgbox">{<img src={picture} />}</div>
    </div>
  );
};

export default Post;
