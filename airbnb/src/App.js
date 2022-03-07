import React from "react";
import Navbar from "./Components/Navbar"
import Hero from "./Components/Hero"
import Card from './Components/Card'
import data from "./data"
import "./style.css"



export default function App() {
  const cards  = data.map(items => {
    return (
      < Card
        key ={items.id}
        {...items} />
      
    )
  })
  return (
    <div>
      <Navbar />
      < Hero />
      <section className="cards-list">
        {cards}
      </section>
    </div>
  )
}