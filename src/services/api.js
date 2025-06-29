const API_KEY = "c1108d3b63b83c1021d21064b5c59be5";
const BASE_URL = "https://api.themoviedb.org/3";
{/*We created two constants, it's provided online*/}

{/*We are using an async function for two reasons:
    1. We want to receive actual data and not just a promise. To put it simply, we receive a pizza instead of just a receipt, which is important for api calls
    2. We want to use await for the app not to freeze, so we can scroll the page, etc.*/}
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json() 
    {/*We transform the raw data into JS objects
         '{"results":[{"title":"Batman","id":123}],"total_pages":20}' into {results: [{title: "Batman", id: 123}], total_pages: 20} */}
    return data.results
};

export const searchMovies = async(query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json()
    return data.results
};

