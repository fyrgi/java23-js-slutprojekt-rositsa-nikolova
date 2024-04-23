async function getMovieImg(id) {
    const url = "https://image.tmdb.org/t/m/w500/";
    const response = await fetch(url);
    const data = await response.json();

    return data.message;
}

async function getPersonImgs(id) {
    
    const url = "https://image.tmdb.org/t/p/w500/" + count;
    const response = await fetch(url);
    const data = await response.json();

    return data.message;    
}

export {getMovieImg, getPersonImgs};