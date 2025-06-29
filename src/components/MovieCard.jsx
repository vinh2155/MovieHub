import "../css/MovieCard.css"
import {useMovieContext} from "../contexts/MovieContext"

{/*Difference between props and state
    1. Props: data that is passed from one component to another (It's a parameter): cannot be modified
    2. State: data that is shared within the component only (It's a variable): can be modified

    Here, MovieCard takes in a props: Movie
    */}
function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext() //We call the three functions from the MovieContext
    const favorite = isFavorite(movie.id) //It's either true or false

    function onFavoriteClick(e) {
        e.preventDefault() //This line tells the browser: "Do not do anything let me handle and run this function only"
        if (favorite) removeFromFavorites(movie.id) //If it's already favorited, remove
        else addToFavorites(movie) //Otherwise, add it
    }

    return <div className="movie-card">

        <div className="movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title}/>
            <div className ="movie-overlay">
                <button className={`favorite-btn ${favorite?"active":""}`} onClick={onFavoriteClick}> {/*The class changes from "favorite-btn" to "favorite-btn active" which changes the CSS */}
                    ♥
                </button>
            </div>
        </div>

        <div className="movie-info">
            <h3>{movie.title}</h3> 
            <p> {movie.release_date?.split("-")[0]}</p> {/*Only display the year and not the full date */}
        </div>

    </div>


}

export default MovieCard