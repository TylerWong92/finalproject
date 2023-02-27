import "./App.css";
import axios from "axios";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">hi test test</h1>
    </div>
  );
}

export default App;
