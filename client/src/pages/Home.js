import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
      console.log(response);
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-32">
      {listOfPosts.map((post, index) => (
        <Card key={index} post={post} />
      ))}
    </div>
  );
};

export default Home;
