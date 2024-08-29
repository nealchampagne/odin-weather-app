import { getWeather } from './getweather.js'
import cloudyeveningsky from './images/backgrounds/cloudyeveningsky.jpg';

export const homeLoad = async () => {
  const content = document.getElementById('content');
  const container = document.getElementById('container');
  const search = document.createElement('input');
  const searchBtn = document.createElement('button');
  const data = document.createElement('div');
  const description = document.createElement('div');
  const temperatureF = document.createElement('div');
  const temperatureC = document.createElement('div');

  container.style.background = `url(${cloudyeveningsky})`;
  container.style.backgroundPosition = 'center';
  container.style.backgroundSize = '3500px'
  search.className = 'search';
  searchBtn.className = 'searchbtn';

  searchBtn.textContent = 'Get Current Weather';

  description.classList.add('text');
  temperatureF.classList.add('datafield');
  temperatureC.classList.add('datafield');

  searchBtn.addEventListener('click', async () => {
    const weatherData = await getWeather(search.value);
    data.textContent = JSON.stringify(weatherData.currentConditions);
    description.textContent = weatherData.description;
    temperatureF.textContent = `Temperature (°F):  ${weatherData.currentConditions.temp}`;
    temperatureC.textContent = `Temperature (°C):  ${Math.round((weatherData.currentConditions.temp - 32) * (5/9) * 10) / 10}`;
    content.appendChild(description);
    content.appendChild(temperatureF);
    content.appendChild(temperatureC);
  });

  content.appendChild(search);
  content.appendChild(searchBtn);
};