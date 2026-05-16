const apiKey = 'e34590fcfbaceaec0c4da65d689a641a';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-msg');

async function checkWeather(city) {
    if (!city.trim()) {
        alert("Please enter a city name");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        
        if (response.status === 404) {
            errorMsg.style.display = 'block';
            weatherCard.style.display = 'none';
        } else {
            const data = await response.json();

            document.getElementById('city-name').innerHTML = data.name;
            document.getElementById('temp').innerHTML = Math.round(data.main.temp) + '°C';
            document.getElementById('humidity').innerHTML = data.main.humidity + '%';
            document.getElementById('wind').innerHTML = data.wind.speed + ' km/h';
            document.getElementById('description').innerHTML = data.weather[0].description;

            // Update icon
            const iconCode = data.weather[0].icon;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            weatherCard.style.display = 'block';
            errorMsg.style.display = 'none';
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(cityInput.value.trim());
});

// Allow pressing "Enter" key to search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(cityInput.value.trim());
    }
});
