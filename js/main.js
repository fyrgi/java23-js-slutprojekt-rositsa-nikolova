import {createTitle, formatNumber} from "./utilities.js";
import {getMostPopularMovies, getTopRatedMovies, getSearchResults} from "./theMovieDdAPI.js";

const shownResults = document.getElementsByClassName("container")[0];
const btnPopular = document.getElementById("btnPopular");
const btnRating = document.getElementById("btnRating");
const btnSearch = document.getElementById("btnSearch");
const searchForm = document.getElementById("searchForm");

/***
 * Different data is displayed based on the user's choice.
 */
btnRating.addEventListener('click', event => {
    event.preventDefault();
    shownResults.innerHTML = "";
    createTitle("Top Rated Movies of All Times");
    getTopRatedMovies();
});

btnPopular.addEventListener('click', event => {
    event.preventDefault();
    shownResults.innerHTML = "";
    createTitle("Most Popular Movies Today");
    getMostPopularMovies();
});

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    shownResults.innerHTML = "";
    const userSearch = document.getElementById("search").value;
    createTitle(`Results for search: ${userSearch}`);
    getSearchResults(userSearch);
});


