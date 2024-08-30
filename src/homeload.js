import { clearChildren } from './clearchildren.js';
import { currentWeatherLoad } from './currentload.js';
import { getCurrentWeather } from './getcurrentweather.js'
import cloudyeveningsky from './images/backgrounds/cloudyeveningsky.jpg';

export const homeLoad = async () => {

  const container = document.getElementById('container');
  const content = document.getElementById('content');
  const title = document.createElement('div');
  const searchContainer = document.createElement('div');
  const searchIcon = document.createElement('div');
  const search = document.createElement('input');
  const searchBtn = document.createElement('button');

  
  clearChildren(content);

  container.style.background = `url(${cloudyeveningsky})`;
  container.style.backgroundPosition = 'center';
  container.style.backgroundSize = '4000px'

  title.classList.add('title');
  searchContainer.classList.add('searchcontainer');
  searchIcon.classList.add('searchicon');
  search.className = 'search';
  searchBtn.className = 'searchbtn';

  title.textContent = 'Odin Weather App';
  searchIcon.textContent = 'Search';
  searchBtn.textContent = 'Get Current Weather';

  

  searchBtn.addEventListener('click', async () => {
    const weatherData = await getCurrentWeather(search.value);
    currentWeatherLoad(weatherData);
  });


  content.appendChild(title);
  content.appendChild(searchContainer);
  searchContainer.appendChild(searchIcon);
  searchContainer.appendChild(search);
  content.appendChild(searchBtn);
};