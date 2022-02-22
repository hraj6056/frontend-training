import { useEffect, useState } from "react";
import "./modal.css";
import "./style.scss";

export default function ModalDisplay({
  imdbID,
  hideModal,
}: {
  imdbID: string;
  hideModal: any;
}) {
  const [errorMessage, seterrorMessage] = useState("Loading Modal");

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
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=8f42a883`
      );
      const temp = await res.json();
      updatejson(temp);
      if (temp) {
        seterrorMessage("");
      }
    } catch (error) {
      const res = (error as Error).message;
      seterrorMessage(res);
    }
  }
  return (
    <div>
      {errorMessage === "" ? (
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
                  <h1 className="text">{json.Title}</h1>
                  <p>{json.Year}</p>
                  <p>{json.Director}</p>
                  <p>{json.imdbRating > 7.0 ? "Boxoffice Hit" : "Flop"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="movie-not-found">{errorMessage}</h2>
      )}
    </div>
  );
}
