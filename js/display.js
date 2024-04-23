function displayImg(imgUrl) {
    const img = document.createElement("img");
    img.src = imgUrl;
    document.body.append(img);
}

function displayImgs(imgUrlArray) {
    for(const imgUrl of imgUrlArray) {
        const img = document.createElement("img");
        img.src = imgUrl;
        document.body.append(img);
    }
    
}

export {displayImg, displayImgs};