import React from "react";
import trollLogo from "/Troll Face.svg";

function Navbar() {
  return (
    <nav>
      <div className="nav--container">
        <div className="nav--logo-container">
          <img className="nav--logo-img" src={trollLogo} alt="Troll-Logo" />
          <p className="nav--logo-text">Meme Generator</p>
        </div>
        <div className="nav--title">React Course - Project 3</div>
      </div>
    </nav>
  );
}

export default Navbar;
