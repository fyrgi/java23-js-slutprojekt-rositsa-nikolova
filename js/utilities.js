function checkIfUserIsOnline(displayContainer) {
    // Check the initial online status.
    const isOnline = window.navigator.onLine;

    // The idea is to add event listeners for online and offline event but for some reason it does not work as I hoped.
    window.addEventListener('online', handleStatusChange(isOnline, displayContainer));
    window.addEventListener('offline', handleStatusChange(isOnline, displayContainer));

    // Return the initial online status
    return isOnline;
}

function handleStatusChange(isOnline, displayContainer) {
    if (isOnline == 'online') {
        const messageForUser = document.getElementsByClassName("errorMessage");
        if (messageForUser != undefined) {
            console.log("sadasdas");
            displayContainer.removeChild(messageForUser);
        }
    } else if (isOnline == 'offline') {
        checkForErrors("offline", displayContainer);
    }
}

// All 3 actions have different titles. They are created here.
function createTitle(titleText) {
    const titleEl = document.getElementsByClassName("showingOnScreen")[0];
    titleEl.innerHTML = titleText;
}

// The popularity rating and the avarage score for movie appear in a non-friendly format from the API.
// This function fixes that by making sure there are always 2 numbers after the decimal point.
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

function checkForErrors(error, displayContainer) {
    const displayErrorMessageEl = document.createElement("p");
    let currentError = "Unexpected error! ";
    let actionMessage = "Report to administrator at admin@gritacademy.se";
    if (error == 401) {
        currentError = "Error: " + error + " Unauthorized. " + actionMessage;
    } else if (error == 404) {
        currentError = "Error: " + error + " Page not found.";
    } else if (error == 400) { 
        currentError = "Error: " + error + " Bad request." + actionMessage;
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
    } else if ( error == "offline" ) {
        return currentError = "You are currently offline.";
    }
    displayErrorMessageEl.innerHTML = currentError;
    displayErrorMessageEl.setAttribute("class", "errorMessage");
    displayContainer.appendChild(displayErrorMessageEl);
}

function showFeedbackMessage(typeOfError, displayContainer) {
    const displayInfoMessageEl = document.createElement("p");
    let showInfoMessage = "";
    if(typeOfError=="no results"){
        showInfoMessage = "Sorry, we couldn't find any results corresponding to your search.<br>Try with another search.";
    } else if (typeOfError=="empty search string") {
        showInfoMessage = "You have to enter something in the search bar to search for a movie or a person.";
    }
    displayInfoMessageEl.innerHTML = showInfoMessage;
    displayInfoMessageEl.setAttribute("class", "infoMessage");
    displayContainer.appendChild(displayInfoMessageEl);
}
export {createTitle, formatNumber, checkForErrors, checkIfUserIsOnline, showFeedbackMessage};