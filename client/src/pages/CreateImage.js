import React, { useState } from "react";
import axios from "axios";
import ArtStyle from "../components/ArtStyle";

const CreateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = () => {
    setIsLoading(true);
    // Perform action that takes some time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Set isLoading to false after 2 seconds
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
        console.log("image stored");
      });
  };

  return (
    <div>
      <section className="flex flex-wrap justify-center gap-4 px-64 py-10">
        <div className="flex flex-col w-full lg:flex-row ">
          <div className="grid flex-grow w-1/2 card bg-base-300 rounded-box ">
            <form onSubmit={handleSubmit}>
              <div className="text-center lg:text-left p-6">
                <h1 className="text-4xl font-bold mb-4">Enter a prompt:</h1>
                <input
                  className=" input input-bordered input-ghost w-full max-w mb-4 "
                  id="prompt-input"
                  type="text"
                  placeholder="Enter prompt..."
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                />
                <p className="py-6">Pick a style</p>
                <ArtStyle />
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
              <img className="full-w" src={imageData} alt="Generated image" />
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
