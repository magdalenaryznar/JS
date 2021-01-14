const apiKey = "3c7078641e96cbf73ff9d36e79c49031";
let forecasts = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("addButton").addEventListener("click", function () {
        const city = document.getElementById("city");
        findCity(city.value);
    })
    loadStored();

});

function loadStored() {
    forecasts = [];
    const storedCities = JSON.parse(window.localStorage.getItem("cities"));
    for(let i =0; i<storedCities.length; i++ ){
        forecasts.push(storedCities[i]);
        showWeather(storedCities[i]);
    }
    updateStoredData();
}

function findCity(city) {
    getWeatherCityData(city);
    updateStoredData();
}

function updateStoredData() {
    localStorage.setItem("cities", JSON.stringify(forecasts));
}

function getWeatherCityData(city) {
    let cityWeather = {};
    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=' + apiKey)
        .then((response) => response.json())
        .then(data => {
            cityWeather.city = data['name'];
            cityWeather.desc = data['weather'][0]['description'];
            cityWeather.temp = Math.round(data['main']['temp']);
            cityWeather.image = data['weather'][0]['icon'];
            cityWeather.wind = data['wind']['speed'];
            cityWeather.pressure = data['main']['pressure'];
            forecasts.push(cityWeather);
            updateStoredData();
        })
        .then(() => showWeather(cityWeather))
        .catch(err => console.log(err));
}

function showWeather(cityWeather) {
    const cities = document.getElementById("cities");
    const elementDiv = document.createElement("div");

    if (forecasts.length === 0) {
        elementDiv.classList.add("right-element");
    }
    else {
        elementDiv.classList.add("left-element")
    }

    const template = document.querySelector("template").content.cloneNode(true);
    template.getElementById("temp").innerHTML = cityWeather.temp;
    template.querySelector(".image").innerHTML = `<img src="http://openweathermap.org/img/wn/${cityWeather.image}@2x.png"/>`;
    template.querySelector("h1").innerHTML = cityWeather.city;

    template.querySelector("#wind").innerHTML = cityWeather.wind;
    template.querySelector("#pressure").innerHTML = cityWeather.pressure;
    template.querySelector("#desc").innerHTML = cityWeather.desc;


    template.querySelector("button").addEventListener("click", function () {
        const indexToDelete = forecasts.indexOf(cityWeather);
        forecasts.splice(indexToDelete, 1);
        updateStoredData();
        window.location.reload();
    })

    elementDiv.appendChild(template);
    console.log(elementDiv);
    cities.appendChild(elementDiv);

}