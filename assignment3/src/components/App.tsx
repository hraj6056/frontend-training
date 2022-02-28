import React from "react";
import { Layout, Pagination, Result, PageHeader } from "antd";
import "antd/dist/antd.css";

import searchMovie from "../apis/searchMovie";
import MovieCard from "./MovieCard";
import Form from "./Form";

interface IProps {}

interface IState {
  query: IQuery;
  response: IQueryResponse<IMovieList>;
}

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  totalResults: "0",
  data: [],
};

class App extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      query: {
        title: "marvel",
        year: "",
        page: 1,
      },
      response: initialState,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }
  fetchMovies = async () => {
    const { response, query } = this.state;
    this.setState({ response: { ...initialState, isLoading: true } });
    try {
      const { title, year, page } = query;
      const { Response, Error, Search, totalResults } = await searchMovie(
        title,
        year,
        page
      );
      if (Response === "False") {
        throw Error;
      }
      this.setState({
        response: {
          ...initialState,
          data: Search,
          totalResults,
        },
      });
    } catch (err) {
      this.setState({
        response: {
          ...initialState,
          isError: true,
          error: typeof err === "string" ? err : "Oops! Something went wrong",
        },
      });
    }
  };
  handleSearch = (value: IQuery) => {
    this.setState({ query: value }, this.fetchMovies);
  };
  handlePageChange = (page: number) => {
    const { query } = this.state;
    this.setState({ query: { ...query, page } }, this.fetchMovies);
  };
  render(): React.ReactNode {
    const { query, response } = this.state;
    const { isLoading, isError, error, data, totalResults } = response;
    return (
      <Layout>
        <Layout.Header>MovieSearchApp</Layout.Header>
        <Layout.Content>
          <PageHeader
            title="Assignment3"
            subTitle="Movie Search using Class Components"
          >
            <Form loading={isLoading} onSearch={this.handleSearch} />
            {isError ? (
              <Result status={"error"} subTitle={error} />
            ) : (
              <MovieCard
                loading={isLoading}
                data={data}
                footer={
                  <Pagination
                    current={query.page}
                    total={Number(totalResults)}
                    showSizeChanger={false}
                    hideOnSinglePage
                    onChange={this.handlePageChange}
                  />
                }
              />
            )}
          </PageHeader>
        </Layout.Content>
      </Layout>
    );
  }
}

export default App;
