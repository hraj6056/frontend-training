import React from "react";
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Card from './components/Card'
import data from "./data"
import "./style.css"


function App() {
  const cards: JSX.Element[] = data.map((items) => {
    return <Card key={items.id} {...items} />;
  });
  return (
    <div>
      <Navbar />
      <Hero />
      <section className="cards-list">{cards}</section>
    </div>
  );
}

export default App;
