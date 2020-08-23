const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("span");

const subClockContainer = document.querySelector(".js-clock-sub"),
secondsTitle = subClockContainer.querySelector(".seconds"),
periodTitle = subClockContainer.querySelector(".period");


function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours > 12 ? hours - 12 : hours
    }:${
        minutes < 10 ? `0${minutes}` : minutes
    }`;
    
    secondsTitle.innerText = `${
        seconds < 10 ? `0${seconds}`: seconds
    }`;

    periodTitle.innerText = `${
        hours > 12 ? `PM` : `AM`
    }`

}

function init(){
    getTime();
    setInterval(getTime,1000);
}

init();