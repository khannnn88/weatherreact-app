import React, { useState } from "react";
import WeatherInfo from "./Weatherinfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./App.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coords: response.data.coord,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
    });
  }
  function search() {
    const apiKey = "f5e814a04eddfab1740f07bf0328eee2";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCitychange(event) {
    setCity(event.target.value);
  }

  if (weatherData.ready) {
    return (
      <div>
        <div className="bar">
          <div className="mb-3">
            <div className="row">
              <div className="col-6">
                <form onSubmit={handleSubmit} id="search-form">
                  <input
                    type="text"
                    className="form-control"
                    id="city-input"
                    placeholder="Enter City"
                    autoComplete="off"
                    autoFocus="on"
                    onChange={handleCitychange}
                  />
                  <div className="col-3">
                    <button
                      type="sbumit"
                      className="btn btn-dark btn-1"
                      id="search"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <WeatherInfo data={weatherData} size={64} />
        <WeatherForecast coords={weatherData.coords} />
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
