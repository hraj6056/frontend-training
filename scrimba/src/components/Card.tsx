import React from "react";
import "../style.css";

export default function Card({
  openSpots,
  coverImg,
  price,
  stats: { rating, reviewCount },
  title,
  location,
}: {
  openSpots: number;
  coverImg: string;
  price: number;
  stats: {
    rating: number;
    reviewCount: number;
  };
  title: string;
  location: string;
}) {
    var badgeText: string;
    if (openSpots === 0) {
        badgeText = "SOLD OUT";
    }
    else if (location === "Online") {
        badgeText = "ONLINE";
    }
    else {
        badgeText=""
    }
  
  return (
    <div className="card">
      {badgeText !== "" ? <div className="card--badge">{badgeText}</div> : null}
      <img
        src={require(`../images/${coverImg}`)}
        className="card--image"
        alt=""
      />
      <div className="card--stats">
        <img
          src={require(`../images/star.png`)}
          className="card--star"
          alt=""
        />
        <span>{rating}</span>
        <span className="gray">({reviewCount}) • </span>
        <span className="gray">{location}</span>
      </div>
      <p className="card--title">{title}</p>
      <p className="card--price">
        <span className="bold">From ${price}</span> / person
      </p>
    </div>
  );
}
