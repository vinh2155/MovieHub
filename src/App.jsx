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
  );
}

export default App; 