const API_KEY='api_key=ba306b13833ddc5af253c23188900851';
const BASE_URL ='https://api.themoviedb.org/3';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTMwNmIxMzgzM2RkYzVhZjI1M2MyMzE4ODkwMDg1MSIsInN1YiI6IjY1YmI0MjY1ZjAzMTc0MDE2MzY2ZmJlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KrfXiSqNYoXmHMAkuFvPFmxPF1OZGZPkEo2CSixv1Ew'
    }
  };
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Function to add a movie to the watchlist
console.log("app starting");

function addMovie() {
    let title = document.getElementById('movieTitle').value;
    let category = document.getElementById('category').value;
    if (category === 'custom') {
        category = document.getElementById('customCategory').value.trim();
        if (category === '') {
            alert("Please enter a custom category.");
            return;
        }
    }
    if (title.trim() === '') {
        alert("Please enter a movie title.");
        return;
    }

    if(checkDuplicateTitle(title)){
        alert("Movie already Exists");
    }else{
        queryForMovie(title);
        updateWatchlist(title, category);
    } 

    // Clear input fields after adding movie
    document.getElementById('movieTitle').value = '';
    document.getElementById('customCategory').value = '';
}

function queryForMovie(title){

fetch('https://api.themoviedb.org/3/search/movie?query='+title+
'&include_adult=false&language=en-US&page=1', options)
    .then(response => response.json())
    .then(response => {
        //call showMovies method here
        console.log(response.results); //all the movies [20 rows]
       // console.log(response.results[0]); //first row
        //console.log(response.results[0].title);//title from first row
       // console.log(response.results[0].poster_path);
       showMovieData(response.results); //should be 20 rows
    })
    .catch(err => console.error(err));
    
}

function showMovieData(data){
    let container = document.getElementById('queriedMoviesContainer')
    container.innerHTML = '';
    data.forEach(function(row){
        let posterData = row.poster_path;
        //console.log(posterData);
        var posterImg = document.createElement('img');
        posterImg.src = BASE_IMG_URL+posterData;
        posterImg.alt = row.title;
        posterImg.classList.add('posterImage');
        // posterImg.style.width = '200px';
        // posterImg.style.height = 'auto';
        container.appendChild(posterImg);

        // var titleParagraph = document.createElement('p');
        // titleParagraph.textContent = row.title;
        // container.appendChild(titleParagraph);

        // var releaseDateParagraph = document.createElement('p');
        // releaseDateParagraph.textContent = row.release_date;
        // container.appendChild(releaseDateParagraph);
    })
}

function checkDuplicateTitle(thisTitle){
    let movieCellDivs = document.querySelectorAll('.movieCell')
    let title;
    for (let i = 0; i < movieCellDivs.length; i++) {
        title = movieCellDivs[i].querySelector('.title').textContent;
        if(title === thisTitle){
            return true;
        }
    }
    return false;
}

// Function to dynamically update the watchlist displayed on the page
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
    checkbox.style.left = '320px';
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

// Show custom category input field when 'Custom' option is selected
document.getElementById('category').addEventListener('change', function() {
    if (this.value === 'custom') {
        document.getElementById('customCategory').style.display = 'inline-block';
    } else {
        document.getElementById('customCategory').style.display = 'none';
    }
});