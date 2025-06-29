//This is the navigation bar at the top. We want it to be present in every page (Home and Favorites)
import {Link} from "react-router-dom"; //We import the Link function for it to redirect to our wanted pages. We can use this because we already created the routes in App.jsx meaning that there's a path.
import "../css/Navbar.css"

function NavBar() {
    return <nav className="navbar">
        <div className = "navbar-brand">
            {/*This is linked to the same place as "Home"*/}
            <Link to="/"> Movie App</Link> 
        </div>
        <div className="navbar-links">
            <Link to = "/" className="nav-link"> Home</Link>
            <Link to = "/favorites" className="nav-link"> Favorites</Link>
        </div>
    </nav>
}

export default NavBar