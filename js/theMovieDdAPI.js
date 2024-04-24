
import { formatNumber, checkForErrors } from "./utilities.js";
const API_KEY = `api_key=a41bf16b13cb3836c69398b0e3523b96`;
const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDFiZjE2YjEzY2IzODM2YzY5Mzk4YjBlMzUyM2I5NiIsInN1YiI6IjY2MjRkOTdhNjJmMzM1MDE3ZGQ5NmM5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xA5WNA_oYUOESVqXaquSVBZDSTI5lL-yzO3hN5GfqZ8`;
const BASE_URL = `https://api.themoviedb.org/3/`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const popularEndpoint = `${BASE_URL}movie/popular?${API_KEY}&sort_by=popularity.desc&language=en-US`;
const topRatedEndpoint = `${BASE_URL}movie/top_rated?${API_KEY}&language=en-US`;
const main = document.getElementsByClassName('container')[0];
let displayImg;

// The function will get the top rated movies though the respective endpoint.
async function getTopRatedMovies() {
  try { 
    const response = await fetch(topRatedEndpoint);
    if(!response.ok){
      throw new Error(checkForErrors(res.status)) ;
    }
    const data = await response.json();
    return data;
  } catch( err ) {
    checkForErrors(err)
  };
}

// With this function we will get the most popular movies. Then we will use the data to get the top 10.
async function getMostPopularMovies() {
  try { 
    const response = await fetch(popularEndpoint);
    if(!response.ok){
      throw new Error(checkForErrors(res.status)) ;
    }
    const data = await response.json();
    return data;
  } catch( err ) {
    checkForErrors(err)
  };
}

// With this function we will get the search results which can be either for movie or person (TV and others excluded).
async function getSearchResults(searchValue) {
  const searchMultiEndpoint = `${BASE_URL}search/multi?query=${searchValue}&${API_KEY}&include_adult=false&language=en-US&page=1`;
  try { 
    const response = await fetch(searchMultiEndpoint);
    if(!response.ok){
      throw new Error(checkForErrors(res.status)) ;
    }
    const data = await response.json();
    return data;
  } catch( err ) {
    checkForErrors(err)
  };
}

// The function display the results sent to it from other functions.
function showMovies(data, top, calledFromSearch) {
  let displayOnTopLeft = 0;
  let displayAsSearchResult;
  if(top==0) {
    top = 10;
  }

  for(let i = 0; i < top; i++) {
    
    const movie = data[i];

    const {id, title, overview, poster_path, release_date, vote_average} = movie;
    
    // Prepare the data from vote_average to be presented with max 2 numbers after the decimal point.
    // If the score is 0 then N/A will be displayed.
    let voteScoreFormatted = formatNumber(vote_average);
    if(voteScoreFormatted == 0) {
      voteScoreFormatted = "N/A";
    }

    let releaseDate = release_date;
    if(releaseDate == null || releaseDate == "") {
      releaseDate = "Not available";
    }

    // In case the function was called after the user searched
    // an additional <div> with description is added after the release date and the top left info will say movie.
    if(calledFromSearch == true) {
      displayOnTopLeft = "Movie"
      displayAsSearchResult = `<div class="description">${overview}</div>`;
    } else {
      displayOnTopLeft++;
      displayAsSearchResult = "";
    }

    useImgUrl(poster_path, 'movie');

    const movieEl = document.createElement('div');
    movieEl.classList.add('resultCard');

    movieEl.innerHTML = `
        <div class="titleHeader">
          <span class="place">${displayOnTopLeft}</span>
          <span class="score">${voteScoreFormatted}</span>
        </div>
        <img class="poster" src="${displayImg}" alt="movie image">
        <a href="https://www.themoviedb.org/movie/${id}" target="_blank"><h4>${title}</h4></a>
        <div class="releaseDate" >Release date: ${releaseDate}</div>
        ${displayAsSearchResult}`;
    main.appendChild(movieEl);
  }
}

function showPerson(data, top) {
  
  for(let i = 0; i < top; i++) {
    const person = data[i];
    const {id, name, known_for, known_for_department, profile_path, popularity} = person;
    
    // Prepare the data from popularity to be presented with max 2 numbers after the decimal point.
    let popularityScoreFormatted = formatNumber(popularity);

    const personEl = document.createElement('div');
    let knownFor = [];
    
    
    personEl.classList.add('resultCard');
    
    let knownForDisplay;
    // If there is no known_for array, N/A will be displayed.
    if(known_for.length == 0) {
      knownForDisplay = "N/A";
    } else {
    // Format the known_for array into a string and replace the comma with a new line.
      for(let i = 0; i < known_for.length; i++) {
        if(known_for[i].media_type == 'movie') {
          knownFor.push("Movie: " + known_for[i].title);
        } else if (known_for[i].media_type == 'tv') {
          knownFor.push("TV: " + known_for[i].name);
        }
      }
      // Replace the comma with a new line for the display.
      knownForDisplay = knownFor.join("<br>");
    }
    

    useImgUrl(profile_path, 'person');

    personEl.innerHTML = `
        <div class="titleHeader">
          <span class="place">${known_for_department}</span>
          <span class="score">${popularityScoreFormatted}</span>
        </div>
        <img class="profileImage" src="${displayImg}" alt="The actor's picture">
        <a href="https://www.themoviedb.org/movie/${id}" target="_blank"><h4>${name}</h4></a>
        <div class="releaseDate" >Known for:<br> ${knownForDisplay}</div>`;
    main.appendChild(personEl);
  }
}

// After the fetch the data is separated based on the media type.
// After separation by movies and people we will use another function to display the found results.
function prepareShowResults(data) {
  let movieReults = [];
  let personResults = [];

  console.log(data.length);
  for(let i = 0; i < data.length; i++) {
    const media_type = data[i].media_type;
    // The if excludes media_type = tv and others.
    if (media_type == 'person') {
      personResults.push(data[i]);
    } else if (media_type == 'movie') {
      movieReults.push(data[i]);
    }
  }
  
  if(movieReults.length > 0) {
    showMovies(movieReults, movieReults.length, true);
  }

  if(personResults.length > 0) {
    showPerson(personResults, personResults.length);
  }
}

// There are results that are missing pictures. When the system encouners one of them,
// it will display a default picture.
// Based on the media_type (person or movie) a different picture will be displayed.
function useImgUrl(pathFromAPI, mediaType){

  // If there is no associated image in the result the pathFromAPI will be null.
  if(pathFromAPI == null) {
    
    if(mediaType == 'person') {
      displayImg = "../img/acting-concept-illustration_114360-6545.jpg";
    } else if (mediaType == 'movie') {
      displayImg = "../img/it-s-movie-time-banner-template-pop-corn-basket-cola-cup-movie-sign-blue-curtain-background_575670-2199.jpg";
    } else {
      displayImg = "../img/hand-drawn-flat-design-no-photo-sign_23-2149278076.jpg"
    }
  } else if (pathFromAPI != null) {
    displayImg = IMG_URL + pathFromAPI;
  }
}

export { getMostPopularMovies, getTopRatedMovies, getSearchResults, showMovies, prepareShowResults};