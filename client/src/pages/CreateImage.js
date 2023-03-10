import React, { useState } from "react";
import axios from "axios";

import img from "../assets/image1.jpg";
import img2 from "../assets/image2.jpg";
import img3 from "../assets/image3.jpg";
import img4 from "../assets/image4.jpg";

const CreateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState("");

  const handleImageClick = (description) => {
    setPrompt(description);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:3001/image", {
      prompt,
    });
    console.log(response.data); // Check the response data
    setImageData(`data:image/png;base64,${response.data.data[0].b64_json}`);
  };

  const handleClick = async () => {
    await axios
      .post(
        `http://localhost:3001/image/store`,
        { imageData },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        alert("image stored successfully");
      });
  };

  const imageOptions = [
    {
      id: 1,
      image: img,
      description:
        "in the style of digital Illustration of the a purely mechanical, 4k, detailed, fantasy vivid colors",
    },
    {
      id: 2,
      image: img2,
      description:
        "in the style of intricate artwork by Beatrix Potter | cottagecore aesthetic | 8K | highly detailed | wide angle |",
    },
    {
      id: 3,
      image: img3,
      description:
        "in the style of botticellis simonetta vespucci young portrait photography hyperrealistic modern dressed, futuristic",
    },
    {
      id: 4,
      image: img4,
      description:
        "in the style of galaxies, spirals, space, nebulae, stars, smoke, iridescent, intricate detail, in the shape of a rabbit, octane render, 8k, uplight",
    },
  ];

  return (
    <div>
      <section className="flex flex-wrap justify-center gap-4 px-64 py-10">
        <div className="flex flex-col w-full lg:flex-row ">
          <div className="grid flex-grow w-1/2 card bg-base-300 rounded-box ">
            <form onSubmit={handleSubmit}>
              <div className="text-center lg:text-left p-6">
                <h1 className="text-4xl font-bold mb-4">Enter a prompt:</h1>
                <form>
                  <textarea
                    className=" input input-bordered input-ghost w-full max-w mt-4 pt-2"
                    value={prompt || ""}
                    onChange={(event) => setPrompt(event.target.value)}
                    placeholder="Enter your text here"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100px",
                      marginTop: "10px",
                    }}
                  />
                </form>

                <p className="py-2">Pick a style</p>
                {imageOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex-grow w-1/4 float-right rounded-box mb-3"
                    onClick={() => handleImageClick(option.description)}
                  >
                    <img src={option.image} className="p-2 rounded-box" />
                  </div>
                ))}
              </div>

              <div className="p-6 self-end">
                <button className="btn btn-block btn-outline" type="submit">
                  Generate Image
                </button>
              </div>
            </form>
          </div>

          <div className="divider lg:divider-horizontal"></div>

          <div className="grid flex-grow w-1/2 card bg-base-300 rounded-box p-4">
            {imageData ? (
              <img
                className="full-w rounded-box mb-4 w-full"
                src={imageData}
                alt="Generated image"
              />
            ) : (
              <button className="btn btn-square loading"></button>
            )}
            <div className="self-end">
              <button className="btn btn-block" onClick={handleClick}>
                Save Image
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateImage;
