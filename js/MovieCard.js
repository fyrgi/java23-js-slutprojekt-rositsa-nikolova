export default class MovieCard {
    #title;
    #id;
    #poseterUrl;
    #description;
    #count;
    constructor(name, id, posterUrl, description, count) {
        this.name = name;
        this.id = id;
        this.posterUrl = posterUrl;
        this.description = description;
        this.count = count;
        this.createCard();
    }

    async createCard()  {

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        
        movieEl.innerHTML = `
            <div class="titleHeader">
              <span class="place">${count}</span>
              <span class="score">${vote_average}</span>
            </div>
            <img class="poster" src="${IMG_URL}${poster_path}" alt="movie image">
            <h4>${title}</h4>
            <div class="description">${overview}</div>
        `;
        main.appendChild(movieEl);
        
        /*const imgEl = document.createElement('img');  
        document.body.append(imgEl);
        const imgUrl = await this.getImage();
        imgEl.src = imgUrl;
*/
        imgEl.addEventListener('click', async () =>{
            const imgUrl = await this.getImage();
            imgEl.src = imgUrl;
        });
        
    }

    async getImage(){
        const url = `https://api.themoviedb.org/3/movie/${this.id}/images`;
        const response = await fetch(url);
        const data = await response.json();
        return data.message;
    }

    getName(){
        return this.name;
    }
}