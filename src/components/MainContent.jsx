import { React, useState, useEffect, createRef } from "react";
import { exportComponentAsJPEG } from "react-component-export-image";

function MainContent() {
  const [allMemes, setAllMemes] = useState([]);
  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/46e43q.png",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function getMeme(event) {
    event.preventDefault();
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;

    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  const memeRef = createRef();

  return (
    <main>
      <div className="main--container">
        <div className="main--form">
          <div className="main--input-container">
            <input
              className="main--input"
              type="text"
              placeholder="Top text"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
            <input
              className="main--input"
              type="text"
              placeholder="Bottom text"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
          </div>
          <div className="main--form-buttons">
            <button className="get-meme-btn" onClick={getMeme}>
              Get a new meme image 🖼
            </button>
            <button
              className="downloadBtn"
              onClick={() =>
                exportComponentAsJPEG(memeRef, {
                  fileName: "Hakona Matata",
                  html2CanvasOptions: { scale: 2 },
                })
              }
            >
              Download
            </button>
          </div>
        </div>

        <div className="meme" ref={memeRef}>
          <img src={meme.randomImage} alt="MemeImg" className="memeImg" />
          <p className="meme--text top">{meme.topText}</p>
          <p className="meme--text bottom">{meme.bottomText}</p>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
