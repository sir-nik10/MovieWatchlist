//check duplicates (watchlist should not have duplicates)
//filtering by category
//search by movie title
watchlist = [];

function checkDuplicateTitle(title){
    watchlist.forEach(movieTitle => {
        if(movieTitle == title){
            return true;
        }
    });
    return false;
}

