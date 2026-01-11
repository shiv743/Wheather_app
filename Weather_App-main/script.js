document.getElementById('get-weather-button').addEventListener('click', () => {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        fetchWeather(cityInput);
    }
});

function fetchWeather(city) {
    const apiKey = '10099929769836d7022086023838b869';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API error');
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weather-result');
            weatherResult.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Condition: ${data.weather[0].description}</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;

            // Change background based on weather condition
            const condition = data.weather[0].main.toLowerCase();
            const body = document.body;
            switch (condition) {
                case 'clear':
                    body.style.backgroundImage = "url('./sun-7161738_1280.webp')";
                    break;
                case 'clouds':
                    body.style.backgroundImage = "url('./ai-generated-8975560_1280.webp')";
                    break;
                case 'rain':
                    body.style.backgroundImage = "url('./ai-generated-8244285_960_720.png')";
                    break;
                case 'snow':
                case'light snow':
                    body.style.backgroundImage = "url('./WhatsApp Image 2024-11-22 at 3.03.31 PM.jpeg')";
                    break;
                case 'mist':
                case 'fog':
                case 'smoke':
                case 'haze':
                    body.style.backgroundImage = "url('./autumn-1839969_1280.jpg')";
                    break;
                case 'thunderstorm':
                    body.style.backgroundImage = "url('./thunderstorm-5680651_1280.jpg')";
                    break;
                default:
                    body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?weather')";
            }

            body.style.backgroundSize = "cover";
            body.style.backgroundRepeat = "no-repeat";
            body.style.backgroundPosition = "center";
        })
        .catch(error => {
            document.getElementById('weather-result').textContent = 'City not found!';
            console.error(error);
        });
}
