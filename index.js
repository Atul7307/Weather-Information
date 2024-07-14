window.onload = function() {
    localStorage.removeItem('selectedCard'); // Clear the specific item from localStorage
    localStorage.removeItem('apiData'); // Clear the specific item from localStorage
    localStorage.removeItem('forecastData'); // Clear the specific item from localStorage
    // Uncomment below line to clear all items from localStorage
    // localStorage.clear(); 
    console.log("localStorage cleared on page load");
};

const inputBox = document.querySelector('.input-box');
const submitBtn = document.querySelector('#searchBtn');
const contentPage = document.querySelector('.contentpage')
const animation = document.querySelector('.loader')
const location_not_found =  document.querySelector('.location-not-found');
console.log(animation)


submitBtn.addEventListener('click', (e) =>{
        e.preventDefault()
        // animation.classList.add('aniop')
        animation.style.opacity = '100%'
        contentPage.style.opacity = '10%'
        const apiKey = '28491eb0fb819591e7e26303204550d6'; // Replace with your OpenWeatherMap API key
        const city = inputBox.value; // Replace with your city
        const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        inputBox.value = '';
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {

                updateCurrentWeather(data);
                console.log(data);
                localStorage.setItem('apiData', JSON.stringify(data));
                var forecasts = data.list.filter((_, index) => index % 8 === 0) // Get data for the next 24 hours (8 intervals of 3 hours each)
                updateForecastCards(forecasts);
                console.log(forecasts);
                localStorage.setItem('forecastData', JSON.stringify(forecasts));
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            })
            .finally(() =>{
                animation.style.opacity = '0'
                contentPage.style.opacity = '100%' 
            })
})
    




function updateCurrentWeather(data) {

    if(data.cod === `404`){
        document.querySelector('.cityName').textContent = `Sorry Location not found !`;
        document.querySelector('.cityName').style.fontSize = "1rem"
        return;
    }
    const currentWeather = data.list[0];
    document.querySelector('.cityName').textContent = data.city.name;
    document.querySelector('.day').textContent = new Date(currentWeather.dt_txt).toLocaleDateString('en-US', { weekday: 'long' });
    document.querySelector('.humidity').textContent = `${currentWeather.main.humidity}%`;
    document.querySelector('.speed').textContent = `${currentWeather.wind.speed} km/h`;
    document.querySelector('.pressure').textContent = `${currentWeather.main.pressure} hPa`;
    document.querySelector('.temprature').innerHTML = `${currentWeather.main.temp} <sup>°C</sup>`;
    document.querySelector('.main').textContent = currentWeather.weather[0].main;
    document.querySelector('.description').textContent = currentWeather.weather[0].description;
    document.querySelector('.weatherImg').src = `./img/${currentWeather.weather[0].main.toLowerCase()}.png`; // Update with appropriate image path
}

function updateForecastCards(forecasts) {
    forecasts.forEach((forecast, index) => {
        document.querySelector(`.day${index + 1} .forcastdate`).textContent = new Date(forecast.dt_txt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        document.querySelector(`.day${index + 1} .forcastdes`).textContent = forecast.weather[0].description;
        document.querySelector(`.day${index + 1} .forcasttemp`).innerHTML = `${forecast.main.temp} <sup>°C</sup>`;
        document.querySelector(`.day${index + 1} .forcastimg`).src = `./img/${forecast.weather[0].main.toLowerCase()}.png`; // Update with appropriate image path
    });
}

const cards = document.querySelectorAll('.forcastcard');
cards.forEach(card => {
    card.addEventListener('click', (e) =>{
        const cardId = card.id;
        localStorage.setItem('selectedCard', cardId);
        window.open('forecastcard.html', '_blank')
        console.log(cardId);

    })
})