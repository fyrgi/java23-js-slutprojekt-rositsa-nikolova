import {createTitle, formatNumber} from "./utilities.js";
import {getMostPopularMovies, getTopRatedMovies, getSearchResults, showMovies, prepareShowResults} from "./theMovieDdAPI.js";

const shownResults = document.getElementsByClassName("container")[0];
const btnPopular = document.getElementById("btnPopular");
const btnRating = document.getElementById("btnRating");
const btnSearch = document.getElementById("btnSearch");
const searchForm = document.getElementById("searchForm");

/***
 * Different data is displayed based on the user's choice.
 */
btnRating.addEventListener('click', async event => {
    event.preventDefault();
    shownResults.innerHTML = "";
    createTitle("Top Rated Movies of All Times");
    const fetchedData = await getTopRatedMovies();
    showMovies(fetchedData.results, 10, false)
});

btnPopular.addEventListener('click', async event => {
    event.preventDefault();
    shownResults.innerHTML = "";
    createTitle("Most Popular Movies Today");
    const fetchedData = await getMostPopularMovies();
    showMovies(fetchedData.results, 10, false)
});

searchForm.addEventListener('submit', async event => {
    event.preventDefault();
    shownResults.innerHTML = "";
    const userSearch = document.getElementById("search").value;
    createTitle(`Results for search: ${userSearch}`);
    const fetchedData = await getSearchResults(userSearch);
    prepareShowResults(fetchedData.results);
});


