import MovieCard from "../components/MovieCard";
import {useState, useEffect} from "react";
import "../css/Home.css";
import {searchMovies, getPopularMovies} from "../services/api" ;

function Home(){
    {/*We use the useState hooks here. There's 3 components:
        1. searchQuery: It's the actual value. If if changes, the whole component re-renders.
        2. setSearchQuery: What's inside the parantheses is the new value, or the added value if it looks like this: 
        "const addToFavorites =(movie)=> {
        setFavorites(prev=>[...prev,movie])"
    }
        3. useState: What's inside the parantheses is the default value */}
    const [searchQuery,setSearchQuery]=useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    {/*We have another hook here: useEffect. Its goal is to handle side effects which are actions that happen outside of rendering the component:
        - API calls (like our getPopularMovies())
        - Local Storage (saving data)
        - DOM manipulation (changing document title)
        
    We used it here because we don't want to fetch the popular movies every time a state is changed like a new letter in the search box*/}
    useEffect(()=>{
        const loadPopularMovies = async()=> {
            try{
                const popularMovies = await getPopularMovies(); //SIDE EFFECT: API call
                setMovies(popularMovies);
            } catch (err) {
                console.log(err); //SIDE EFFECT: Console logging
                setError("Failed to load movies...");
            }
            finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    },[]); // This empty array is called a depedency array: an empty list means it runs only if we refresh the page


    const handleSearch = async(e) => {
        e.preventDefault(); //After the search, the search box does not go empty again
        if (!searchQuery.trim()) return //Return nothing, because the search is empty -> Exit the function
        if (loading) return //Same thing, if it's loading -> Exit the function
        setLoading(true) //Set the loading to true again
        try {
            const searchResults = await searchMovies(searchQuery) //Get the data from the API
            setMovies(searchResults) //Change the state of the movies
            setError(null) //Change the state of error back to null. Imagine if the first search did not went through. There would be an error. If we try again with "Batman", it would work. The error state still have an error, so we need to reset it back to null.

        }
        catch (err) {
            console.log(err)
            setError("Failed to search movies...")

        }
        finally {
            setLoading(false)
        }

    };

    return (
        <div className="home">
            <form onSubmit ={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="seach-input" 
                value={searchQuery} //The search is the value of searchQuery
                onChange={(r)=> setSearchQuery(r.target.value)}/> {/*Whenever there's a change, we make sure that it searchQuery gets updated */}
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {/*There could be an error in  two situations:
            1. It fails to load the movie state
            2. It fails to search for the movie
            */}

            {/*The return comes first, then the useEffect that calls the handleSearch function. We set to loading true at first so this always part always run first.
            
            It shows "Loading...", then the useEffect loads. When finished, the loading state changes to false so the second part (after :) runs.
            */}
            {loading?(
                <div className = "loading">Loading...</div>
            ):(
            <div className="movies-grid">
                {movies.map((movie)=> movie.title.toLowerCase().startsWith(searchQuery)&&(
                    <MovieCard movie={movie} key={movie.id}/>
                    ))}
                    {/*The .map is built-in JavaScript function that works on arrays. It goes throufh each item and does something with each item. We want to only display movies with the corresponding letters in the search box, even before clicking on search. At first searchQuery is "", so it displays every popular movies
                    
                    Movie: "Batman" 
                    "batman".startsWith("bat") // true
                    true && <MovieCard .../> // Shows the MovieCard ✅

                    Movie: "Superman"
                    "superman".startsWith("bat") // false  
                    false && <MovieCard .../> // Shows nothing ❌

                    Why do we need a key?
                    Without key:
                    {movies.map((movie) => 
                    <MovieCard movie={movie} key={movie.id}/>

                    It's for performance issues. For example, a movie "Batman" disappeared after typing "s". Batman doesn't disappear because React removed it. Batman gets filtered out by our code (startsWith(searchQuery)), and THEN React has to figure out how to update the DOM to match.

                    Without the key, it has to re-render everything because they don't know which movie is which. However, with key, it knows that the movie with key=4 got filtered, I'm going to remove it from the list according to that change.

                    The key is the fingerprint!*/}
            </div>)
            }
        </div>
    );
}

export default Home;