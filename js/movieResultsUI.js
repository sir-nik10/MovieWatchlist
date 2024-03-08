import { trimMovieTitle, checkEmpty, clearInputField } from "./movieData/movieDataUtils.js";
import { fetchMovies, BASE_IMG_URL } from "./api/api.js";
import { showMoreInfo, toggleMoreInfoVisibility } from "./moreInfoUI.js"
var movieData = [];

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
        showMovieData(movieData);
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

async function showMovieData(data){
    
    var container = document.getElementById('queried-movies-container')
    container.innerHTML = '';
    let i =0;
    console.log("creating images");
    data.forEach(row =>{
        console.log(row);
        let posterData = row.poster_path;
        let titleData = row.title;
        let releaseDateData = row.release_date;
        let idData = row.id;
        
        if(posterData != null){
            var searchedMoviesDiv = document.createElement('div');
            searchedMoviesDiv.classList.add('searched-movies-div');

            var posterImg = document.createElement('img');
            posterImg.src = BASE_IMG_URL+posterData;
            posterImg.alt = titleData;
            posterImg.classList.add('poster-image');
            posterImg.id = i;
            posterImg.onclick = imageClickHandler;

            var movieTitle = document.createElement('p');
            movieTitle.textContent = titleData;
            movieTitle.margin = "3px";

            var releaseDate = document.createElement('p');
            releaseDate.textContent = releaseDateData;
            releaseDate.margin = "3px";

            // posterImg.style.width = '200px';
            // posterImg.style.height = 'auto';
            searchedMoviesDiv.appendChild(posterImg);
            searchedMoviesDiv.appendChild(movieTitle);
            searchedMoviesDiv.appendChild(releaseDate);

            container.appendChild(searchedMoviesDiv);
            i=i+1;
        }
    })
}

function imageClickHandler(){
    console.log("image number: " +this.id +" clicked. ");
    console.log(movieData[this.id]);
    toggleMoreInfoVisibility();
    showMoreInfo(movieData[this.id]);
}