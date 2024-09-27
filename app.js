const API_KEY = "63becd58";
const APIURL =
    `http://www.omdbapi.com/?s=popular&apikey=${API_KEY}`;

const SEARCHAPI =
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=`;

const movieBox = document.querySelector("#movie-box");

// Function to fetch and display movies
const getMovies = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
            showMovies(data.Search);  // OMDb returns search results in 'Search' field
        } else {
            movieBox.innerHTML = "<h2>No results found</h2>";
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        movieBox.innerHTML = "<h2>Error fetching movies</h2>";
    }
};

// Initial fetch of popular movies
getMovies(APIURL);

// Function to display movie details
const showMovies = (movies) => {
    movieBox.innerHTML = ""; // Clear previous content
    movies.forEach((movie) => {
        const imagePath = movie.Poster === "N/A" ? "img/image-missing.png" : movie.Poster;
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <img src="${imagePath}" alt="${movie.Title}" />
            <div class="overlay">
                <div class="title">
                    <h2>${movie.Title} (${movie.Year}) </h2>
                    
                </div>
                <h3>Overview:</h3>
                <p>IMDb ID: ${movie.imdbID}</p>
            </div>
        `;
        movieBox.appendChild(box);
    });
};

// Search functionality with debounce

document.querySelector("#search").addEventListener("keyup", function (event) {
    
    
        const searchValue = event.target.value;
        if (searchValue !== "") {
             
            
            getMovies(SEARCHAPI + searchValue); // Encoding the search term to handle spaces or special characters
        } else {
            getMovies(APIURL); // Fetch popular movies if search is cleared
        }
     
});
