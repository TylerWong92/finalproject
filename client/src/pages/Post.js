import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  // For redirect pages after action
  let navigate = useNavigate();

  // Get Single Post by Id and also fetch their users comments.
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
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
    </div>
  );
};

export default Post;
