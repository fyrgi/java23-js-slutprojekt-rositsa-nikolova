
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

export { getMostPopularMovies, getTopRatedMovies, showMovies};