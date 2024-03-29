//Helper functions to sanatize movie title to prepare to query database
export function trimMovieTitle(title) {
    console.log("trimming the input..");
    // Remove leading and trailing whitespace
    let trimmedTitle = title.trim();

    // Remove any other characters that might cause issues in a movie title query
    // For example, remove special characters, multiple spaces, etc.
    trimmedTitle = trimmedTitle.replace(/[^\w\s]/gi, ''); // Remove non-word characters
    trimmedTitle = trimmedTitle.replace(/\s+/g, ' ');     // Replace multiple spaces with a single space

    return trimmedTitle;
}

export function checkEmpty(title){
    console.log("checking if input is empty..");
    return title.trim() === '';
}

export function clearInputField(element){
    element.value = '';
}
