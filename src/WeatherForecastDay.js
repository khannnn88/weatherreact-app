import React from "react";
import WeatherIcon from "./WeatherIcon";

export default function WeatherForecastDay(props) {
  function maxTemp() {
    let temperature = Math.round(props.data.temp.max);
    return `${temperature}°`;
  }
  function minTemp() {
    let temperature = Math.round(props.data.temp.min);
    return `${temperature}°`;
  }
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div>
      <div className="row">
        <div className="col-md">
          {" "}
          <div className="forecast-dates ">{day()}</div>{" "}
          <div id="forecast-icon">
            <WeatherIcon code={props.data.weather[0].icon} size={40} />
          </div>{" "}
          <div>
            <span className="forecast-temp-max">{maxTemp()}</span>{" "}
            <span className="forecast-temp-min">{minTemp()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
