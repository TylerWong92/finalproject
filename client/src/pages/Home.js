import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key}>
            <div
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {value.title}
            </div>
            <div>{value.postText}</div>
            <Link to={`/profile/${value.UserId}`}>{value.username}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
