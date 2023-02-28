import React from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  let { id } = useParams();
  return <div>post{id}</div>;
};

export default Post;
