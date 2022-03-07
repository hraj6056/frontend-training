import React from "react";
import "../style.css";

export default function Navbar() {
  return (
    <nav>
      <img
        src={require(`../images/airbnb-logo.png`)}
        className="nav--logo"
        alt=""
      />
    </nav>
  );
}
