//needs the data information to populate mroe info box:
//i.e. Overview, rating, genre, video, poster, title
//on watchlist click and on serach movie click
import { BASE_IMG_URL } from "./api/api.js";

let inforBoxContainerElement = document.getElementById('info-box-container');
let titleElement = document.getElementById('title-info-box');
let overviewElement = document.getElementById('overview-info-box');
let posterElement = document.getElementById('poster-info-box');
let releaseElement =  document.getElementById('release-year-info-box');
let ratingElement = document.getElementById('rating-info-box');
let genreContainerElement = document.getElementById('genre-container');
let closeButtonElement = document.getElementById('back-button-info-box');
closeButtonElement.onclick = toggleMoreInfoVisibility;

export function showMoreInfo(movieData){
    console.log("Displaying more info..");
    
    titleElement.textContent = movieData.title;
    
    overviewElement.textContent = movieData.overview;
    
    posterElement.src=BASE_IMG_URL+movieData.poster_path;
    posterElement.alt=movieData.title;
    
    releaseElement.textContent = movieData.release_date;
   
    ratingElement.textContent = Math.floor(movieData.vote_average*10)+'%';

    
    genreContainerElement.innerHTML = '';
    for(let i =0; i<movieData.genre_ids.length; i++){
        let genreElement = document.createElement('p');
        genreElement.textContent = movieData.genre_ids[i];
        //genreElement.style.fontFamily = "Arial, Helvetica, sans-serif";
        genreContainerElement.appendChild(genreElement);
    }
}

export function toggleMoreInfoVisibility() {
    // Toggle display property of synopsis element
    inforBoxContainerElement.style.display = (inforBoxContainerElement.style.display === 'none') ? 'grid' : 'none';
}



