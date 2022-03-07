import React from "react"
import "../style.css"
import navicon from "../images/airbnb-logo.png"

export default function Navbar() {
    return (
        <nav>
            <img src={navicon} className="nav--logo" alt=""/>
        </nav>
    )
}