function createTitle(titleText) {
    const titleEl = document.getElementsByClassName("showingOnScreen")[0];
    titleEl.innerHTML = titleText;
}

function formatNumber(number) {
    let numberStr = number.toString();
    
    if (numberStr.includes('.')) {
        let [integerPart, fractionalPart] = numberStr.split('.');
        fractionalPart = fractionalPart.length > 2 ? fractionalPart.slice(0, 2) : fractionalPart.padEnd(2, '0');
        numberStr = `${integerPart}.${fractionalPart}`;
    } else {
        // If there's no decimal part, add ".00"
        numberStr += ".00";
    }
    
    return numberStr;
}

function checkForErrors(error) {
    const displayErrorMessageEl = document.getElementsByClassName("errorMessage")[0];
    let currentError = "Unexpected error: " + error;
    let actionMessage = "Report to administrator at admin@gritacademy.se";
    console.log(error);
    if (error == 401) {
        currentError = "Error: " + error + " Unauthorized.";
    } else if (error == 404) {
        currentError = "Error: " + error + " Page not found";
    } else if (error == 400) { 
        currentError = "Error: " + error + " Bad request";
    } else if (error == 429) {
        currentError = "Error: " + error + " Too many requests";
    } else if (error == 403) {
        currentError = "Error: " + error + " Forbidden";
    } else if (error == 500) {
        currentError = "Error: " + error + " Internal server error";
    } else if (error == 503) {
        currentError = "Error: " + error + " Service unavailable";
    } else if (error == 502) {
        currentError = "Error: " + error + " Bad gateway";
    } else if ( error == "TypeError: Failed to fetch" ) {
        currentError = "Error: " + error + ". You might be disconnected from the internet.";
    }

    console.log(currentError + " " + actionMessage);
}

export {createTitle, formatNumber, checkForErrors};