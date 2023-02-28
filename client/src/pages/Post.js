import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const [postObject, setPostObject] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, []);

  return (
    <div>
      <div>{postObject.title}</div>
      <div>{postObject.postText}</div>
      <div>{postObject.username}</div>
    </div>
  );
};

export default Post;
