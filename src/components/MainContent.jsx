import { React, useState, useEffect, createRef } from "react";
import html2canvas from "html2canvas";

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

  function handleDownload() {
    document.getElementById("exportMemeContainer").style.display = "flex";

    html2canvas(memeRef.current, {
      logging: true,
      useCORS: true,
      scale: 3,
    }).then((canvas) => {
      let exportImage = document.createElement("a");
      exportImage.href = canvas.toDataURL("img/png");
      exportImage.download = "meme-download";
      exportImage.click();
    });

    document.getElementById("exportMemeContainer").style.display = "none";
  }

  const [customDimension, setCustomDimensions] = useState({
    width: "1920",
    height: "1080",
  });

  function handleCustomDimensions(event) {
    const { name, value } = event.target;
    setCustomDimensions((prevCustomDimensions) => ({
      ...prevCustomDimensions,
      [name]: value,
    }));
  }

  const [customFontSize, setCustomFontSize] = useState("16px");
  useEffect(() => {
    setCustomFontSize(
      customDimension.width < 1280
        ? "40px"
        : customDimension.width < 1920
        ? "50px"
        : customDimension.width < 3840
        ? "70px"
        : "120px"
    );
  }, [customDimension.width]);

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
            <button className="downloadBtn" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>

        <div className="download--group">
          <div className="custom-dimensions">
            <div className="custom-width-group">
              <label htmlFor="width">Width (px)</label>
              <input
                type="number"
                name="width"
                id="width"
                placeholder="Width"
                value={customDimension.width}
                onChange={handleCustomDimensions}
                min={1}
              />
            </div>
            <div className="custom-height-group">
              <label htmlFor="height">Height (px)</label>
              <input
                type="number"
                name="height"
                id="height"
                placeholder="Height"
                value={customDimension.height}
                onChange={handleCustomDimensions}
                min={1}
              />
            </div>
          </div>
          <div className="standard-dimensions">
            <button
              className="720p"
              onClick={() => setCustomDimensions({ width: 1280, height: 720 })}
            >
              720p
            </button>
            <button
              className="1080p"
              onClick={() => setCustomDimensions({ width: 1920, height: 1080 })}
            >
              1080p
            </button>
            <button
              className="4k"
              onClick={() => setCustomDimensions({ width: 3840, height: 2160 })}
            >
              4K
            </button>
          </div>
        </div>

        <div className="meme">
          <img src={meme.randomImage} alt="MemeImg" className="memeImg" />
          <p className="meme--text top">{meme.topText}</p>
          <p className="meme--text bottom">{meme.bottomText}</p>
        </div>
        <div
          className="export--meme-container"
          id="exportMemeContainer"
          ref={memeRef}
          style={{
            width: `${customDimension.width}px`,
            height: `${customDimension.height}px`,
            display: "none",
          }}
        >
          <img
            src={meme.randomImage}
            alt="MemeImg"
            className="export--memeImg"
            style={{ width: "100%", height: "100%" }}
          />
          <p
            className="meme--text top"
            style={{ fontSize: `${customFontSize}` }}
          >
            {meme.topText}
          </p>
          <p
            className="meme--text bottom"
            style={{ fontSize: `${customFontSize}` }}
          >
            {meme.bottomText}
          </p>
        </div>
      </div>
    </main>
  );
}

export default MainContent;
