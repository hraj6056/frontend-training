declare interface IQuery{
    title: string;
    year: string;
    page: number;
}
declare interface IQueryResponse<T>{
    isLoading: boolean;
    data: IResponse<T>["Search"];
    isError: boolean;
    error: string;
    totalResults: IResponse<T>["totalResults"];
}
declare interface IResponse<T>{
    Response: "True" | "False";
    Search: T[];
    Error: string;
    totalResults: string;
}
declare interface IMovieList{
    imdbID: string;
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
}
