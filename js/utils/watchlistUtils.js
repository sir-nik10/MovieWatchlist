//helper fucntions for the watchlist
export function checkDuplicateTitle(watchlist, title){
    watchlist.forEach(movie => {
        if(movie.title == title){
            return true;
        }
    });
    return false;
}

export function removeButtonHandler(){
    let parentCell = this.parentElement;
    let parentLi = parentCell.parentElement;
    let parentUl = parentLi.parentElement;
    parentUl.remove();
}

export function movieCellClickHandler(){
    let parentDiv = div.parentElement;
    //future work
}