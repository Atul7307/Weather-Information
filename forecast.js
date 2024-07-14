const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg =  document.querySelector('.weatherImg');
const temprature =  document.querySelector('.temprature');
const description =  document.querySelector('.description');
const humidity =  document.querySelector('#humidity')
const windSpeed =  document.querySelector('#windSpeed');
const maxTemp =  document.querySelector('#maxTemp');
const minTemp =  document.querySelector('#minTemp');
const location_not_found =  document.querySelector('.location-not-found');
const weatherBody =  document.querySelector('.weatherBody');


const weatherData= JSON.parse(localStorage.getItem('apiData'));
const forecastsData = JSON.parse(localStorage.getItem('forecastData'));
console.log(forecastsData)
console.log(weatherData);

window.addEventListener('DOMContentLoaded', function() {
    const id = localStorage.getItem('selectedCard');
    console.log(id);
    updateWeather(id)

    console.log(weatherData);
});

function updateWeather(id){
    if(weatherData.cod === `404`){
        location_not_found.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    }

    location_not_found.style.display = "none";
    weatherBody.style.display = "flex";

    temprature.innerHTML = `${forecastsData[id-1].main.temp}<sup>°C</sup`;

    description.innerHTML = `${forecastsData[id-1].weather[0].description} Weather`;

    humidity.innerHTML = `${forecastsData[id-1].main.humidity}%`;

    windSpeed.innerHTML = `${forecastsData[id-1].wind.speed}km/H`

    maxTemp.innerHTML = `${forecastsData[id-1].main.temp_max}<sup>°C</sup`
    minTemp.innerHTML = `${forecastsData[id-1].main.temp_min}<sup>°C</sup`

    switch (forecastsData[id-1].weather[0].main) {
        case 'Mist':
            weatherImg.src = "/img/mist.png"
            break;
        case 'Clouds':
            weatherImg.src = "/img/cloud.png"
            break;
        case'Clear':
            weatherImg.src = "/img/clear.png"
            break;
        case 'Rain':
            weatherImg.src = "/img/rain.png"
            break;
        case 'Snow':
            weatherImg.src = "/img/snow.png"
            break;
    
        default:
            break;
    }
}
