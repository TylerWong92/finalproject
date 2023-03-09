import React from "react";
import { useNavigate, Link } from "react-router-dom";

const { Buffer } = require("buffer");

const Card = ({ post }) => {
  const navigate = useNavigate();
  const buffer = Buffer.from(post.image, "base64");

  return (
    <div>
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <img
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
          className="w-full"
          src={buffer}
          alt={post.title}
        />
      </div>
      <div className="card-body">
        <h2
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
          className="card-title"
        >
          {post.title}
        </h2>
        <p>{post.postText}</p>
        <div className="card-actions justify-start">
          <div className="badge">
            <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
