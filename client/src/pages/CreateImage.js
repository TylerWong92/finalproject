import React, { useState } from "react";
import axios from "axios";
// const { Buffer } = require("buffer");

const CreateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/image", {
      prompt,
    });
    // console.log(response.data.data[0].b64_json); // Check the response data
    setImageData(`data:image/png;base64,${response.data.data[0].b64_json}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt-input">Enter a prompt:</label>
        <input
          id="prompt-input"
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
        <button type="submit">Generate Image</button>
      </form>
      {imageData && <img src={imageData} alt="Generated image" />}
    </div>
  );
};

export default CreateImage;
