document.getElementById('searchButton').addEventListener('click', function() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '7300a473dcf10c5ead7511073c62be41'; // Replace with your actual API key from OpenWeatherMap

    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        if (errorData.cod === 401) {
                            throw new Error('Invalid API key. Please check your key and try again.');
                        } else if (errorData.cod === 404) {
                            throw new Error('City not found. Please enter a valid city.');
                        } else {
                            throw new Error(`Error: ${errorData.message}`);
                        }
                    });
                }
                return response.json();
            })
            .then(data => {
                document.getElementById('location').innerText = data.name;
                document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
                document.getElementById('description').innerText = `Weather: ${data.weather[0].description}`;
            })
            .catch(error => {
                alert(`Error fetching weather data: ${error.message}`);
                console.error('Error:', error);
            });
    } else {
        alert('Please enter a city.');
    }
});
