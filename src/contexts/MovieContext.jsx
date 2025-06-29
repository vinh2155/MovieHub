import {createContext, useState, useContext, useEffect} from "react"

{/*Context allows data to be passed through components as props */}

//Creating the context
const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)
//This is the Provider Component with children as a prop, but it's in {} because it's a destructor; every component can use the context.
export const MovieProvider = ({children}) => {
    //We have a shared state
    const [favorites, setFavorites] = useState([])
    
    
    //The two useEffect is only and only for the app to remember the favorite movies. The app would also work without it, but it would reset everytime we refresh!




    {/* Goal: Loading Favorites
        
        What's JSON (JavaScript Object Notation): It's a way to transform JavaScript data (objects) into text (and back)
        
        For example: [{id: 1, title: "Batman"}, {id: 2, title: "Superman"}] into 
        '[{"id":1,"title":"Batman"},{"id":2,"title":"Superman"}]'
        
        localStorage can only save text*/}
    useEffect(()=>{
        const storedFavs = localStorage.getItem("favorites")
                                    
        if (storedFavs) setFavorites(JSON.parse(storedFavs)) //JSON.parse = transform text into JS data/JS objects

    }, [])
    {/*Goal: Saving Favorites
       The depedency array is [favorites], so this effect runs every time this state changes. */}
    useEffect(()=>{
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    //We have 3 shared functions (addToFavorites, removeFromFavorites, isFavorite)
    const addToFavorites =(movie)=> {
        setFavorites(prev=>[...prev,movie])
    }
    const removeFromFavorites =(movieId)=> {
        setFavorites(prev=>prev.filter(movie=>movie.id!==movieId))
    }
    const isFavorite =(movieId)=> {
        return favorites.some(movie=> movie.id===movieId)
    }
    //Bundle everything together (State and Functions)
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    //We provide it all to all children
    return <MovieContext.Provider value = {value}>
        {children}
    </MovieContext.Provider>


    {/*Here's the entire process when clicking on the heart button:
    👆 Click Heart Button
        ↓
    🔘 onFavoriteClick() runs IN MovieCard
        ↓
    📞 addToFavorites(movie) gets called
        ↓ (This is the SAME function from MovieContext!)
    🏠 addToFavorites() runs IN MovieContext
        ↓
    📝 setFavorites(prev => [...prev, movie]) changes state
        ↓
    💾 useEffect saves to localStorage
        ↓
    🔄 All components re-render with new favorites */}
}