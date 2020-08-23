const UNSPLASH_API_KEY =
  "QK-mcl5iEHMSEI93urvjCvdqaDr-8YCrsrtd83u44kI";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");

const BACKGROUND = "bg";

const IMG_NUMBER = 3;


function handleImgLoad(image) {
    body.appendChild(image);
}

function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    image.addEventListener("loadend", handleImgLoad(image));
}

function getRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER) + 1;
    return number;
}


function loadBackground(){
    const savedImage = localStorage.getItem(BACKGROUND);
    if(savedImage === null){
        getBackGround();
    } else{
        const parsedImage = JSON.parse(savedImage);
        const today = new Date();
        if (today > paintImage.expirationDate) {
            getBackGround();
        } else {
            body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${
                parsedImage.url
              })`;
        }
    }
    return;
}

function saveBackground(imageUrl){
    const saveImage = localStorage.getItem(BACKGROUND);
    if(saveImage !== null) {
        localStorage.removeItem(BACKGROUND);
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    const imageObject = {
        url: imageUrl,
        expirationDate
    };
    localStorage.setItem(BACKGROUND, JSON.stringify(imageObject));
    loadBackground();
    return;
}

function getBackGround(){
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(json => {
            const image = json;
            if(image.urls && image.urls.full) {
                const fullUrl = image.urls.full;
                saveBackground(fullUrl);
            }else{
                getBackGround();
            }
        });
    return;
}

function init(){
    // const randomNumber = getRandom();
    // paintImage(randomNumber);
    loadBackground();
    return;
}

init();