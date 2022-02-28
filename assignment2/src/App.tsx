import { useState, useMemo, FunctionComponent } from "react";
import Pagination from "./pagination";
import "./style.scss";
import ModalDisplay from "./ModalDisplay";

let Pagesize = 4;

const App: FunctionComponent = () => {
  const [movieName, updatemovieName] = useState("");
  const [year, updateyear] = useState("");
  const [data, updatedata] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imdbId, setimdbId] = useState("");
  const [totalCount, updatetotalCount] = useState(0);
  const [errorMessage, seterrorMessage] = useState("Enter movie name and year");

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * Pagesize;
    const lastPageIndex = firstPageIndex + Pagesize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

  async function requestMovies() {
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${movieName}&y=${year}&apikey=8f42a883`
      );
      const json = await res.json();

      if (json.Search) {
        updatedata(json.Search);
        updatetotalCount(json.Search.length);
        seterrorMessage("");
        setCurrentPage(1);
      } else {
        updatedata([]);
        updatetotalCount(0);
        setCurrentPage(0);
        seterrorMessage("Movie Not Found ! ,Enter Another movie name and year");
      }
    } catch (error) {
      const res = (error as Error).message;
      updatedata([]);
      updatetotalCount(0);
      setCurrentPage(0);
      seterrorMessage(res);
    }
  }
  const toggleModal = (_imdbID: string) => {
    setimdbId(_imdbID);

    setShowModal(true);
  };

  return (
    <div className="search-movies">
      <header className="header">
        <h1>Assignment 2</h1>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestMovies();
        }}
        className="form"
      >
        <label htmlFor="moviename">Moviename </label>
        <input
          id="movieName"
          value={movieName}
          placeholder="Moviename"
          onChange={(e) => updatemovieName(e.target.value)}
        />

        <label htmlFor="year" className="year">
          Year{" "}
        </label>
        <input
          id="year"
          value={year}
          placeholder="Year"
          onChange={(e) => updateyear(e.target.value)}
        />

        <button className="button">Submit</button>
      </form>
      <br />
      <br />
      {totalCount > 0 && errorMessage === "" ? (
        <table>
          <thead>
            <tr>
              <th>Movie Title</th>
              <th>Year</th>
              <th>Know More</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map(
              (
                item: {
                  Title: string;
                  Year: number;
                  imdbID: string;
                },
                index
              ) => {
                return (
                  <tr key={index}>
                    <td>{item.Title}</td>
                    <td>{item.Year}</td>
                    <td>
                      <button onClick={() => toggleModal(item.imdbID)}>
                        Show Modal
                      </button>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      ) : (
        <h2 className="movie-not-found">{errorMessage}</h2>
      )}
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={totalCount}
        siblingCount={1}
        pageSize={Pagesize}
        onPageChange={(page: number) => setCurrentPage(page)}
      />
      {showModal ? (
        <ModalDisplay imdbID={imdbId} hideModal={() => setShowModal(false)} />
      ) : null}
    </div>
  );
};
export default App;
