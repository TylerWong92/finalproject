import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const { Buffer } = require("buffer");

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  // const [listOfPicture, setListOfPicture] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
      console.log(response);
      //setListOfPicture(response.data.pictures);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        console.log(value);
        const buffer = Buffer.from(value.image, "base64");
        return (
          <div key={key}>
            <div
              onClick={() => {
                navigate(`/post/${value.id}`);
              }}
            >
              {<img src={buffer} />}
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
