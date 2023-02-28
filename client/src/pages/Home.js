import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <div
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div>{value.title}</div>
            <div>{value.postText}</div>
            <div>{value.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
