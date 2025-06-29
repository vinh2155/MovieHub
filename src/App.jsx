import './css/App.css';
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import {Routes,Route} from "react-router-dom";
import {MovieProvider} from "./contexts/MovieContext"
import NavBar from "./components/NavBar"

function App() {
  return (
    <MovieProvider>
      <NavBar/> {/*The NavBar component is called outside of the routes because we want it to be in both pages */}
    
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}/> 
          {/*We created a route with a path (represents the link) and element (represents the component page) */}
          <Route path="/favorites" element={<Favorites />}/>
        </Routes>
        
      </main>
    </MovieProvider>

    /*Since everything is wrapped inside of MovieProvider, we have access to:
      favorites - The list of favorite movies
      addToFavorites - Function to add a movie to favorites
      removeFromFavorites - Function to remove a movie from favorites
      isFavorite - Function to check if a movie is favorited 
      
      This mean that:
      MovieCard Component can use:
        addToFavorites - When you click the heart button on a movie
        removeFromFavorites - When you un-heart a movie
        isFavorite - To show if a movie is already favorited (filled vs empty heart)
      Favorites Component can use:
        favorites - To display all your favorite movies
        
      Notice how we don't call "const { x,y } = useMovieContext()" in every component.
      
      In fact, we don't call it in NavBar, because it's not necessary. We call it in Home/MovieCard and Favorites only*/
  );
}

export default App; 