import React, { useEffect, useState } from "react";
import "./modal.css";
export default function ModalDisplay({
  imdbID,
  hideModal,
}: {
  imdbID: string;
  hideModal: any;
}) {
  const [json, updatejson] = useState(
    {} as {
      Poster: string;
      Title: string;
      Year: string;
      Director: string;
      imdbRating: number;
    }
  );
  useEffect(() => {
    requestMovies();
  });
  async function requestMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=8f42a883`
    );
    const temp = await res.json();
    updatejson(temp);
  }
  return (
    <div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <button onClick={() => hideModal()} className="close">
            &times;
          </button>
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img className="image" src={json.Poster} alt="Avatar" />
              </div>
              <div className="flip-card-back">
                <h1>{json.Title}</h1>
                <p>{json.Year}</p>
                <p>{json.Director}</p>
                <p>{json.imdbRating > 7.0 ? "Boxoffice Hit" : "Flop"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
