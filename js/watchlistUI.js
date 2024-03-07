//1. append movie information to watchlist
//2. checkbox strikthrough
//3. remove item from watchlist

//TODO: append to the watchlist
//design what data is being appended
function addMovie(title) {
 
    if(checkDuplicateTitle(title)){
        alert("Movie already Exists");
    }else{

        data = fetchMovies(title);
        updateWatchlist(title, category);
        showMovieData(data);
    } 

    // Clear input fields after adding movie
    let inputField = document.getElementById('movieTitle');
    clearInputField(inputField);
}

import { queryForMovie } from './movieData/api.js'

function updateWatchlist(thisTitle, category) {
    
    let watchlistDiv = document.getElementById('watchlist');
    let watchListListElement = watchlistDiv.querySelector('ul');

    let listElement = document.createElement('li');

    let movieCellDiv = document.createElement('div');
    movieCellDiv.value = 'movieCell';
    movieCellDiv.className = 'movieCell';

    let title = document.createElement('p');
    title.className = "title"; 

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.left = '100px';
    checkbox.style.position = 'relative';

    let removebutton = document.createElement('button');
    removebutton.textContent = 'x';
    removebutton.className = 'remove-button';

    let tag = document.createElement('p');
    tag.className = "tag";
    tag.textContent = category;

    title.textContent = thisTitle;
    movieCellDiv.appendChild(title);
    movieCellDiv.appendChild(tag);
    movieCellDiv.appendChild(checkbox);
    movieCellDiv.appendChild(removebutton);
    
    listElement.appendChild(movieCellDiv);

    watchListListElement.appendChild(listElement);
    
    console.log('movie successfully made');

    movieCellDiv.addEventListener('click', function() {
        console.log("div clicked");
        toggleMoreInfoVisibility(movieCellDiv);
    });

    updateRemoveButtons();
}

function toggleMoreInfoVisibility(movieCellDiv) {
    // Toggle display property of synopsis element
    let moreInfoDiv = document.getElementById("info-box-container");
    let moreInfoTitle = document.getElementById('titleParagraph');

    moreInfoDiv.style.display = 'block';
    let movieCellTitle = (movieCellDiv.querySelector(".title").textContent);
    console.log(movieCellTitle);
    moreInfoTitle.innerHTML = '';
    moreInfoTitle.innerHTML = '<span>Title:<span/>'
    moreInfoTitle.innerHTML += movieCellTitle;
}

// Get all remove buttons
function updateRemoveButtons(){
    let removeButtons = document.querySelectorAll('.remove-button');
    // Loop through each remove button and attach click event listener
    removeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Get the parent div element of the remove button that was clicked
            let parentDiv = button.parentElement;

            let parentList = parentDiv.parentElement;
            // Remove the parent div element from the DOM
            parentList.remove();
        });
    });
}

document.getElementById('category').addEventListener('change', function() {
    if (this.value === 'custom') {
        document.getElementById('customCategory').style.display = 'inline-block';
    } else {
        document.getElementById('customCategory').style.display = 'none';
    }
});