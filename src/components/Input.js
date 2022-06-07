import React, { useState } from "react";
import { useEffect } from "react";
import "./input.css";

export default function Input() {
  const [memeImage, setMemeImage] = useState({
    input1: "",
    input2: "",
    randomImg: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);
  function handleTexts(event) {
    const { name, value } = event.target;
    setMemeImage((prevMemeImage) => {
      return {
        ...prevMemeImage,
        [name]: value,
      };
    });
  }
  const handleClick = () => {
    const randoNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randoNumber].url;
    console.log(url);
    setMemeImage((prevMemeImage) => {
      return {
        ...prevMemeImage,
        randomImg: url,
      };
    });
  };
  return (
    <div className="input">
      <div className="inputs">
        <div className="texts">
          <input
            type="text"
            className="input1"
            name="input1"
            value={memeImage.input1}
            onChange={handleTexts}
          />
          <input
            type="text"
            className="input2"
            name="input2"
            value={memeImage.input2}
            onChange={handleTexts}
          />
        </div>
      </div>

      <button className="button" onClick={handleClick}>
        <h2>Generate a new Meme image</h2>
      </button>

      <div className="image">
        <h1>{memeImage.input1}</h1>
        <img src={memeImage.randomImg} alt="" />
        <h2>{memeImage.input2}</h2>
      </div>
    </div>
  );
}
