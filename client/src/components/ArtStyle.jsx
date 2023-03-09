import React, { useState } from "react";
import img from "../assets/image1.jpg";

const ArtStyle = () => {
  const [inputText, setInputText] = useState("");
  const [submittedText, setSubmittedText] = useState("");

  function handleInputChange(event) {
    setInputText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedText(inputText);
    setInputText("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text"
          value={inputText}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "0px",
            backgroundColor: "gray",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Submit
        </button>
      </form>
      {submittedText && <p>You submitted: {submittedText}</p>}
    </div>
  );
};

export default ArtStyle;
