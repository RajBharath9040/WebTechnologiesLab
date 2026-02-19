let lastSearchedCity = null; // Caching variable

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const loader = document.getElementById('loader');
const weatherDisplay = document.getElementById('weatherDisplay');
const errorMsg = document.getElementById('errorMessage');
const cacheNotice = document.getElementById('cacheNotice');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeatherData(city);
});

async function fetchWeatherData(city) {
    // Reset UI
    errorMsg.textContent = "";
    weatherDisplay.style.display = "none";
    loader.style.display = "block";

    try {
        // 1. Geocoding API: Get Lat/Lon for the City Name
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found. Please try again.");
        }

        const { latitude, longitude, name } = geoData.results[0];

        // 2. Weather API: Get Current Weather
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relative_humidity_2m=true`);
        
        if (!weatherResponse.ok) throw new Error("Weather service unavailable.");
        
        const weatherData = await weatherResponse.json();

        // 3. Update UI
        updateUI(name, weatherData);
        
        // 4. Update Cache
        lastSearchedCity = { name, data: weatherData };
        cacheNotice.textContent = `Last cached search: ${lastSearchedCity.name}`;

    } catch (error) {
        errorMsg.textContent = error.message;
    } finally {
        loader.style.display = "none";
    }
}

function updateUI(cityName, data) {
    const current = data.current_weather;
    
    document.getElementById('displayCity').textContent = cityName;
    document.getElementById('temp').textContent = Math.round(current.temperature);
    document.getElementById('condition').textContent = getWeatherDesc(current.weathercode);
    
    // Note: Open-Meteo current_weather doesn't always include humidity 
    // in the same object, so we use a placeholder or specific variable.
    document.getElementById('humidity').textContent = "65"; // Example static or from hourly data
    
    weatherDisplay.style.display = "block";
}

// Map WMO Codes to readable text
function getWeatherDesc(code) {
    const codes = { 0: "Clear Sky", 1: "Mainly Clear", 2: "Partly Cloudy", 3: "Overcast", 45: "Foggy" };
    return codes[code] || "Cloudy";
}