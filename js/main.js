import { searchMovies } from "./movieResultsUI.js"

function initializeApp() {
    console.log("app starting");
    const searchButton = document.getElementById('searchMovieButton');
    searchButton.addEventListener('click', handleSearchButtonClick);
}

function handleSearchButtonClick(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    searchMovies();
}

document.addEventListener('DOMContentLoaded', initializeApp);