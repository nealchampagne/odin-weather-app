import { clearChildren } from "./clearchildren";
const reqIcons = require.context('./images/icons', true, /\.svg$/ );
const icons = reqIcons.keys()
  .map(path => ({ path, file: reqIcons ( path ) }) );

export const currentWeatherLoad = async (weatherData) => {

  const content = document.getElementById('content');
  const quickView = document.createElement('div');
  const title = document.createElement('div');

  const data = document.createElement('div');
  const description = document.createElement('div');
  const temperatureF = document.createElement('div');
  const temperatureC = document.createElement('div');
  const humidity = document.createElement('div');
  const precipChance = document.createElement('div');
  const wind = document.createElement('div');
  const icon = new Image();
  icon.src = icons.find(icon => icon.path === `./${weatherData.currentConditions.icon}.svg`).file;

  clearChildren(content);

  content.classList.add('currentview');
  title.classList.add('title');
  quickView.classList.add('quickview');
  icon.classList.add('icon');
  description.classList.add('text');
  temperatureF.classList.add('fahrenheit');
  temperatureC.classList.add('celsius');
  data.classList.add('data');

  title.textContent = weatherData.resolvedAddress;
  data.textContent = JSON.stringify(weatherData.currentConditions);
  description.textContent = weatherData.description;
  temperatureF.textContent = `${weatherData.currentConditions.temp} °F`;
  temperatureC.textContent = `(${Math.round((weatherData.currentConditions.temp - 32) * (5/9) * 10) / 10} °C)`;
  humidity.textContent = `Humidity: ${weatherData.currentConditions.humidity}%`;
  precipChance.textContent = `Precipitation: ${weatherData.currentConditions.precipprob}%`

  const windDir = weatherData.currentConditions.winddir;
  let windCompDir;

  if (0 <= windDir && windDir <= 11.25 || 348.75 < windDir && windDir <= 360) {
    windCompDir = 'N';
  } else if (11.25 < windDir && windDir <= 33.75) {
    windCompDir = 'NNE';
  } else if (33.75 < windDir && windDir <= 56.25) {
    windCompDir = 'NE';
  } else if (56.25 < windDir && windDir <= 78.75) {
    windCompDir = 'ENE';
  } else if (78.75 < windDir && windDir <= 101.25) {
    windCompDir = 'E';
  } else if (101.25 < windDir && windDir <= 123.75) {
    windCompDir = 'ESE';
  } else if (123.75 < windDir && windDir <= 146.25) {
    windCompDir = 'SE';
  } else if (146.25 < windDir && windDir <= 168.75) {
    windCompDir = 'SSE';
  } else if (168.75 < windDir && windDir <= 191.25) {
    windCompDir = 'S';
  } else if (191.25 < windDir && windDir <= 213.75) {
    windCompDir = 'SSW';
  } else if (213.75 < windDir && windDir <= 236.25) {
    windCompDir = 'SW';
  } else if (236.25 < windDir && windDir <= 258.75) {
    windCompDir = 'WSW';
  } else if (258.75 < windDir && windDir <= 281.25) {
    windCompDir = 'W';
  } else if (281.25 < windDir && windDir <= 303.75) {
    windCompDir = 'WNW';
  } else if (303.75 < windDir && windDir <= 326.25) {
    windCompDir = 'NW';
  } else if (326.25 < windDir && windDir <= 348.75) {
    windCompDir = 'NNW';
  };

  console.log(windCompDir);

  wind.textContent = `Wind: ${windCompDir} ${weatherData.currentConditions.windspeed} mph`

  content.appendChild(title);
  content.appendChild(quickView);
  quickView.appendChild(temperatureF);
  quickView.appendChild(temperatureC);
  quickView.appendChild(icon);
  content.appendChild(description);
  content.appendChild(humidity);
  content.appendChild(precipChance);
  content.appendChild(wind);
  content.appendChild(data);

} 