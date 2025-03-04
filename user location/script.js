document.getElementById('getLocation').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const address = data.results[0].address_components;
                const city = address.find(comp => comp.types.includes('locality'))?.long_name || 'Unknown City';
                const state = address.find(comp => comp.types.includes('administrative_area_level_1'))?.long_name || 'Unknown State';
                const country = address.find(comp => comp.types.includes('country'))?.long_name || 'Unknown Country';

                document.getElementById('locationInfo').textContent = `Location: ${city}, ${state}, ${country}`;
                initMap(lat, lng, city, state, country);
                getWeather(lat, lng);
            } else {
                document.getElementById('locationInfo').textContent = "Location not found.";
                initMap(lat, lng, "Unknown City", "Unknown State", "Unknown Country");
            }
        })
        .catch(error => {
            console.error("Geocoding error:", error);
            document.getElementById('locationInfo').textContent = "Failed to get location.";
            initMap(lat, lng, "Unknown City", "Unknown State", "Unknown Country");
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

let map; // Declare map variable globally

function initMap(lat, lng, city, state, country) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 10
    });
    new google.maps.Marker({
        position: { lat: lat, lng: lng },
        map: map,
        title: `${city}, ${state}, ${country}`
    });
}

function getWeather(lat, lng) {
    const apiKey = "YOUR_OPENWEATHER_API_KEY";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.weather && data.weather.length > 0) {
                const weatherDescription = data.weather[0].description;
                const temperature = data.main.temp;
                document.getElementById('weatherInfo').textContent = `Weather: ${weatherDescription}, Temperature: ${temperature}°C`;
            } else {
                console.log("Weather data not found");
            }
        })
        .catch(error => {
            console.error("Weather API error:", error);
        });
}