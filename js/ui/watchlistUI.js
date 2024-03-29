//1. append movie information to watchlist
//2. checkbox strikthrough
//3. remove item from watchlist

//TODO: append to the watchlist
//design what data is being appended

import { removeButtonHandler, movieCellClickHandler} from "../utils/watchlistUtils.js"
import { BASE_IMG_URL } from "../api/api.js";

export function updateWatchlist(data) {
    
    let watchlistDiv = document.getElementById('watchlist');

    //must be fixed size
    let watchListListElement = document.createElement('ul');

    let listElement = document.createElement('li');

    let movieCellDiv = document.createElement('div');
    movieCellDiv.value = 'movieCell';
    movieCellDiv.className = 'movie-cell';
    //future work this
    //movieCellDiv.onclick = movieCellClickHandler;

    let titleElement = document.createElement('p');
    titleElement.className = "title";
    titleElement.textContent = data.title; 

    let posterElement = document.createElement('img');
    posterElement.src = BASE_IMG_URL+data.poster_path;
    posterElement.alt = data.title;

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.left = '100px';
    checkbox.style.position = 'relative';

    let removebutton = document.createElement('button');
    removebutton.textContent = 'x';
    removebutton.className = 'remove-button';
    removebutton.onclick = removeButtonHandler;

    let tag = document.createElement('p');
    tag.className = "tag";
    tag.textContent = "null";

    movieCellDiv.appendChild(titleElement);
    movieCellDiv.appendChild(tag);
    movieCellDiv.appendChild(checkbox);
    movieCellDiv.appendChild(removebutton);
    
    listElement.appendChild(movieCellDiv);

    watchListListElement.appendChild(listElement);

    watchlistDiv.appendChild(watchListListElement);
    
    console.log('movie successfully made');
}

