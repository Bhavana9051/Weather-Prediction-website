const apiKey = '0b8646b0dacd8b4d992793a01971470c';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const bodyElement = document.body;

const weatherImages = {
    sunny: 'sunny.avif',
    cloud: 'cloudy.avif',
    wind: 'windy.avif',
    storm: 'stormy.avif',
    rain: 'rainy.avif',
    fog: 'foggy.avif',
    snow: 'snowy.avif',
    cold: 'cold.avif',
    warm: 'warm.avif',
    default: 'default.avif'
};

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            setBackgroundImage(data.weather[0].description.toLowerCase());
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function setBackgroundImage(weatherDescription) {
    const weatherMapping = {
        sunny: ['sunny', 'hot', 'clear', 'bright'],
        cloud: ['cloudy', 'overcast','few clouds'],
        wind: ['windy'],
        storm: ['storm', 'thunderstorm', 'rainstorm'],
        rain: ['rainy', 'rain'],
        fog: ['foggy', 'fog', 'misty', 'mist'],
        snow: ['snowy', 'snow','breezing'],
        cold: ['cold'],
        warm: ['warm'],
        default: ['default']
    };

    let matchedWeatherType = 'default';

    for (const [weatherType, keywords] of Object.entries(weatherMapping)) {
        if (keywords.some(keyword => weatherDescription.includes(keyword))) {
            matchedWeatherType = weatherType;
            break;
        }
    }

    const imageFilename = weatherImages[matchedWeatherType];
    const imagePath = `imgs/${imageFilename}`;
    bodyElement.style.backgroundImage = `url('${imagePath}')`;
}
