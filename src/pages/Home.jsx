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
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)

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
                <input type="text" placeholder="Search for movies..." className="seach-input" value={searchQuery} onChange={(r)=> setSearchQuery(r.target.value)}/>
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading?(
                <div className = "loading">Loading...</div>
            ):(
            <div className="movies-grid">
                {movies.map((movie)=> movie.title.toLowerCase().startsWith(searchQuery)&&(
                    <MovieCard movie={movie} key={movie.id}/>
                    ))}
            </div>)
            }
        </div>
    );
}

export default Home;