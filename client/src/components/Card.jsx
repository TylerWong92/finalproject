import React from "react";
import { useNavigate, Link } from "react-router-dom";

const { Buffer } = require("buffer");

const Card = ({ post }) => {
  const navigate = useNavigate();
  const buffer = Buffer.from(post.image, "base64");

  return (
    <div className="card w-96 bg-base-100 shadow-xl gap-4 py-4">
      <figure>
        <img
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
          className="w-full"
          src={buffer}
          alt={post.title}
        />
      </figure>
      <div className="card-body">
        <h2
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
          className="card-title"
        >
          {post.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{post.postText}</p>
        <div className="card-actions justify-end">
          <div className="badge">
            <Link to={`/profile/${post.UserId}`}>{post.username}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
