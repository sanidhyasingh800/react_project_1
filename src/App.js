import React from 'react';
import './App.css';
import SearchIcon from './search.svg'
import { useState, useEffect } from 'react';
import MovieCard from './moviecard';


const API_URL = 'http://www.omdbapi.com?apikey=2d8666df';



const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');




    const searchMovies = async (title) => { 
        // async informs react to perform this asynchonously 
        //      as data fetching takes time
        // the operation that the function must complete is specified by await
        const response = await fetch(`${API_URL}&s=${title}`); // returns a Response Object 
        // fetch is a JS function for making http requests
        // we define response as the result of an API call
        // the `` are used to define string literals 
        // ${} are used to input variables into strings 
        // we essentially attack the fetch req onto the API_URL to obtain data
        const data = await response.json(); // reads the Response object and parses it into JSON
        setMovies(data.Search);

    }

   useEffect(() => {
    searchMovies('Marvel');
   }, []);

    return (
        <div className ="app"> 
        {// the classname assigned to a component tells CSS which formatting to use 
            }
        <h1>MovieLand</h1>

        <div className ='search'> 
            <input  // input object in html
                placeholder= 'Enter Movie Name'
                value = {searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 

            />
            <img 
                src = {SearchIcon}
                alt = 'search'
                onClick = {() => {searchMovies(searchTerm)}}
            />
        </div>
            {
            movies?.length > 0
            ?
            (<div className = 'container'>
                { movies.map( (movie) => {
                    return(<MovieCard movie1 = {movie}/>)
                })}
            </div>) :
            <div className = 'empty'>
                <h2>No Movies found</h2>
            </div>

            }

        </div>



    );
}

export default App;