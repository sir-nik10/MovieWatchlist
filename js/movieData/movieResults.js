//main driver
import { trimMovieTitle, checkEmpty, clearInputField } from "/js/utils/movieDataUtils.js";
import { fetchMovies } from "/js/api/api.js";
import { showMovieData } from "/js/ui/movieResultsUI.js";
import { toggleMoreInfoVisibility, showMoreInfo } from "/js/ui/moreInfoUI.js";
import { updateWatchlist } from "/js/ui/watchlistUI.js"
import { checkDuplicateTitle } from "/js/utils/watchlistUtils.js";

export var movieData = [];
export var selectedMovie;
export var watchlist = [];

export async function searchMovies(){
    console.log("searching movies..");
    let titleElement = document.getElementById('movie-title');
    let title = titleElement.value;
    //ensure the title is suitable for query
    if(checkEmpty(title)){
        console.log("input was empty.");
        return;
    }
    title = trimMovieTitle(title);
    console.log("movie title trimmed");
    try{
        const data = await fetchMovies(title);
        //console.log("data:" + data)
        storeMovieData(data);
        showMovieData(data);
    }catch(error){
        handleError(error);
    }
    clearInputField(titleElement);
   
}

async function storeMovieData(data){
    movieData = [];
    data.forEach(row =>{
        if(row.poster_path != null){
            movieData.push(row);
        }
    })
    // console.log("first row in list: " + movieData[0]);
    // console.log("first row id in list: " + movieData[0].id);
}

export function imageClickHandler(){
    console.log("image number: " +this.id +" clicked. ");
    console.log(movieData[this.id]);
    toggleMoreInfoVisibility();
    showMoreInfo(movieData[this.id]);
    selectedMovie = this;
}

export function addToWatchlist(){
    if(checkDuplicateTitle(watchlist, selectedMovie.title)){
        console.log("Movie already Exists!");
    }else{
        watchlist.push(selectedMovie);
        updateWatchlist(selectedMovie);
    }
}