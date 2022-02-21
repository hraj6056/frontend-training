import React, { useEffect, useState, useMemo, FunctionComponent } from "react";
import Pagination from "./pagination";
import "./style.scss";
import ModalDisplay from "./ModalDisplay";

let Pagesize = 4;

let totalCount: number;

const Search: FunctionComponent = () => {
  const [Moviename, updateMoviename] = useState("");
  const [year, updateyear] = useState("");
  const [data, updatedata] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [imdbId, setimdbId] = useState("");
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * Pagesize;
    const lastPageIndex = firstPageIndex + Pagesize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  useEffect(() => {
    if (data.length > 0) requestMovies();
  }, []);

  async function requestMovies() {
    const res = await fetch(
      `http://www.omdbapi.com/?s=${Moviename}&y=${year}&apikey=8f42a883`
    );
    const json = await res.json();
    totalCount = json.Search.length;

    updatedata(json.Search);

    if (totalCount > 0) setCurrentPage(1);
  }
  const toggleModal = (_imdbID: string) => {
    setimdbId(_imdbID);

    setShowModal(true);
  };

  return (
    <div className="search-movies">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void requestMovies();
        }}
      >
        <label htmlFor="moviename">
          Moviename
          <input
            id="location"
            value={Moviename}
            placeholder="Moviename"
            onChange={(e) => updateMoviename(e.target.value)}
          />
        </label>
        <label htmlFor="year">
          Year
          <input
            id="year"
            value={year}
            placeholder="year"
            onChange={(e) => updateyear(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
      <br />
      <br />
      {data.length > 0 ? (
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
      ) : Moviename !== "" ? (
        <h1>Movie Not Found</h1>
      ) : (
        <h2>Enter a movie Name and Year</h2>
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
export default Search;
