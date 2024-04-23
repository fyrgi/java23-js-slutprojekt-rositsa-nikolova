const clickedButton = document.getElementsByClassName("btn");

import {getMostPopularMovies, getTopRatedMovies, showMovies, getSearchResults} from "./auth.js";
//getMostPopularMovies();

for(let i = 0; i < clickedButton.length; i++) {
    clickedButton[i].addEventListener('click', event=>{
        event.preventDefault();
        const btnText = clickedButton[i].innerText;
        const shownResults = document.getElementsByClassName("container")[0];
        if(btnText == "Top 10 by Rating") {
            shownResults.innerHTML = "";
            createTitle("Top Rated Movies of All Times");
            getTopRatedMovies();
        } else if (btnText == "Top 10 by Popularity") {
            shownResults.innerHTML = "";
            createTitle("Most Popular Movies Today");
            getMostPopularMovies();
        } else if(btnText == "Search") {
            shownResults.innerHTML = "";
            const userSearch = document.getElementById("search").value;
            createTitle(`Results for search: ${userSearch}`);
            getSearchResults(userSearch);
        }
    })
}
function createTitle(titleText) {
    const titleEl = document.getElementsByClassName("showingOnScreen")[0];
    titleEl.innerHTML = titleText;
}