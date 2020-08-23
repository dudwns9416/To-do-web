const weather = document.querySelector(".js-weather");

const API_KEY = "951f6f637e40a715dbf1a709c932e8ae";
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    })
    .then(function(json){
        const temperature = Math.floor(json.main.temp);
        const place = json.name;
        console.log(json);
    
        weather.innerText = `${place} ${temperature}ºC`
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = {
        latitude,
        longitude
    };
    saveCoords(coords);
    getWeather(latitude,longitude)
}

function handelGeoError(){
    console.log("Can't access position");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handelGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();