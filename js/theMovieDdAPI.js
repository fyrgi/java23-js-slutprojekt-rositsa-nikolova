
const API_KEY = `api_key=a41bf16b13cb3836c69398b0e3523b96`;
const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDFiZjE2YjEzY2IzODM2YzY5Mzk4YjBlMzUyM2I5NiIsInN1YiI6IjY2MjRkOTdhNjJmMzM1MDE3ZGQ5NmM5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xA5WNA_oYUOESVqXaquSVBZDSTI5lL-yzO3hN5GfqZ8`;
const BASE_URL = `https://api.themoviedb.org/3/`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
const popularEndpoint = `${BASE_URL}movie/popular?${API_KEY}&sort_by=popularity.desc&language=en-US`;
const topRatedEndpoint = `${BASE_URL}movie/top_rated?${API_KEY}&language=en-US`;
const main = document.getElementsByClassName('container')[0];
let displayImg;

// The function will get the top rated movies though the respective endpoint.
function getTopRatedMovies() {
  fetch(topRatedEndpoint)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.results);
      showMovies(data.results, 10);
    })
    .catch((err) => console.error("error:" + err));;
}

// With this function we will get the most popular movies. Then we will use the data to get the top 10.
function getMostPopularMovies() {
  fetch(popularEndpoint)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results, 10);
    })
    .catch((err) => console.error("error:" + err));
}

// With this function we will get the search results which can be either for movie or person (TV and others excluded).
function getSearchResults(searchValue) {
  const searchMultiEndpoint = `${BASE_URL}search/multi?query=${searchValue}&${API_KEY}&include_adult=false&language=en-US&page=1`;
  fetch(searchMultiEndpoint)
    .then((res) => res.json())
    .then((data) => {
      prepareShowResults(data.results);
      console.log(data.results);
    })
    .catch((err) => console.error("error:" + err));
}

// The function display the results sent to it from other functions.
function showMovies(data, top) {
  let count = 0;
  if(top==0) {
    top = 10;
  }
  for(let i = 0; i < top; i++) {
    count++;
    const movie = data[i];
    console.log(data[i]);
    const {id, title, overview, poster_path, release_date, vote_average} = movie;
    //console.log(movie);
    useImgUrl(poster_path, 'movie');

    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
        <div class="titleHeader">
          <span class="place">${count}</span>
          <span class="score">${vote_average}</span>
        </div>
        <img class="poster" src="${displayImg}" alt="movie image">
        <a href="https://www.themoviedb.org/movie/${id}" target="_blank"><h4>${title}</h4></a>
        <div class="releaseDate" >Release date: ${release_date}</div>`;
    main.appendChild(movieEl);
  }
}

function showPerson(data, top) {
  let count = 0;
  if(top==0) {
    top = 10;
  }
  for(let i = 0; i < top; i++) {
    count++;
    const movie = data[i];
    const {id, name, known_for, profile_path, popularity} = movie;
    
    const movieEl = document.createElement('div');
    let knownFor = [];
    
    movieEl.classList.add('movie');
    let knownForDisplay;
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
      
      knownForDisplay = knownFor.join("<br>");
    }

    console.log(knownFor);
    useImgUrl(profile_path, 'person');

    movieEl.innerHTML = `
        <div class="titleHeader">
          <span class="place">${count}</span>
          <span class="score">${popularity}</span>
        </div>
        <img class="poster" src="${displayImg}" alt="The actor's picture">
        <a href="https://www.themoviedb.org/movie/${id}" target="_blank"><h4>${name}</h4></a>
        <div class="releaseDate" >Known for:<br> ${knownForDisplay}</div>`;
    main.appendChild(movieEl);
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
    showMovies(movieReults, movieReults.length);
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
export { getMostPopularMovies, getTopRatedMovies, getSearchResults};