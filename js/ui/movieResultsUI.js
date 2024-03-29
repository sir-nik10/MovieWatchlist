//Display searched movie title to searched movie container

import {  BASE_IMG_URL } from "../api/api.js";
import { imageClickHandler } from "../movieData/movieResults.js";

export async function showMovieData(results){
    var container = document.getElementById('queried-movies-container')
    container.innerHTML = '';
    let i =0;
    console.log("creating images");
    results.forEach(row =>{
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

