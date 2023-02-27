import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Final Project</h1>

      {listOfPosts.map((value, key) => {
        return (
          <div>
            <div>{value.title}</div>
            <div>{value.postText}</div>
            <div>{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
