
const API_KEY = `api_key=a41bf16b13cb3836c69398b0e3523b96`;
const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDFiZjE2YjEzY2IzODM2YzY5Mzk4YjBlMzUyM2I5NiIsInN1YiI6IjY2MjRkOTdhNjJmMzM1MDE3ZGQ5NmM5NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xA5WNA_oYUOESVqXaquSVBZDSTI5lL-yzO3hN5GfqZ8`;
const BASE_URL = `https://api.themoviedb.org/3/`;
const IMG_URL = `https://image.tmdb.org/t/p/w500`;
//https://api.themoviedb.org/3/movie/popular?&api_key=a41bf16b13cb3836c69398b0e3523b96
const popularEndpoint = `${BASE_URL}movie/popular?${API_KEY}&sort_by=popularity.desc&language=en-US`;
const topRatedEndpoint = `${BASE_URL}movie/top_rated?${API_KEY}&language=en-US`;

const main = document.getElementsByClassName('container')[0];
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
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    
    movieEl.innerHTML = `
        <div class="titleHeader">
          <span class="place">${count}</span>
          <span class="score">${vote_average}</span>
        </div>
        <img class="poster" src="${IMG_URL}${poster_path}" alt="movie image">
        <a href="https://www.themoviedb.org/movie/${id}" target="_blank"><h4>${title}</h4></a>
        <div class="releaseDate" >Release date: ${release_date}</div>
    `;
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
    //console.log(movie);
    const movieEl = document.createElement('div');
    let knownFor = [];
    //let nameOfMedia;
    movieEl.classList.add('movie');
    for(let i = 0; i < known_for.length; i++) {
      if(known_for[i].media_type == 'movie') {
        knownFor.push(movie.known_for[i].media_type, movie.known_for[i].title, "<br>");
      } else if (known_for[i].media_type == 'tv') {
        knownFor.push(movie.known_for[i].media_type, movie.known_for[i].name, "<br>");
      }
    }
  
    movieEl.innerHTML = `
        <div class="titleHeader">
          <span class="place">${count}</span>
          <span class="score">${popularity}</span>
        </div>
        <img class="poster" src="${IMG_URL}${profile_path}" alt="movie image">
        <a href="https://www.themoviedb.org/movie/${id}" target="_blank"><h4>${name}</h4></a>
        <div class="releaseDate" >Known for<br> ${knownFor}</div>
    `;
    main.appendChild(movieEl);
  }
}

function prepareShowResults(data) {
  let movieReults = [];
  let personResults = [];
  console.log(data.length);
  for(let i = 0; i < data.length; i++) {
    const media_type = data[i].media_type;
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
    console.log(personResults);
    showPerson(personResults, personResults.length);
  }
}
export { getMostPopularMovies, getTopRatedMovies, showMovies, getSearchResults};