import createTitle from "./utilities.js";
import {getMostPopularMovies, getTopRatedMovies, getSearchResults} from "./theMovieDdAPI.js";

const clickedButton = document.getElementsByClassName("btn");
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


