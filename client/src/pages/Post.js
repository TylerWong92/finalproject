import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
    // eslint-disable-next-line
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert("User Not Login");
        } else {
          const commentToAdd = { commentBody: newComment };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  return (
    <div>
      <h1 className="text-3xl">post-inner</h1>
      <div>{postObject.title}</div>
      <div>{postObject.postText}</div>
      <div>{postObject.username}</div>
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
        return <div key={key}>{comment.commentBody}</div>;
      })}
    </div>
  );
};

export default Post;
