const apiKey = '932c2625edab4347ae612110250902';  // Substitua com sua chave da API da WeatherAPI
const baseUrl = 'https://api.weatherapi.com/v1/current.json';

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert("Por favor, insira o nome de uma cidade.");
        return;
    }

    const url = `${baseUrl}?key=${apiKey}&q=${city}&lang=pt`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert('Cidade não encontrada!');
            return;
        }

        const cityName = data.location.name;
        const temp = data.current.temp_c;
        const weatherDescription = data.current.condition.text;
        const forecast = data.current.condition.icon;

        document.getElementById('cityName').innerText = `Clima em ${cityName}`;
        document.getElementById('currentTemp').innerText = `Temperatura: ${temp}°C`;
        document.getElementById('currentWeather').innerText = `Clima: ${weatherDescription}`;
        document.getElementById('forecast').innerHTML = `
            <img src="https:${forecast}" alt="Ícone do clima" />
            Previsão atual: ${weatherDescription}`;
    } catch (error) {
        alert('Erro ao buscar dados. Tente novamente.');
    }
}
