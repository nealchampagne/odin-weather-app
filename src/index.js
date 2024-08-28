const content = document.getElementById('content');
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchbtn');
const data = document.getElementById('data');

const getWeather = async () => {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${search.value}/?key=CSDFLBZZSWCSSEZDFPQ22QWZD`, {mode: 'cors'});
  const weatherData = await response.json();
  data.textContent = JSON.stringify(weatherData.currentConditions);
};

searchBtn.addEventListener('click', () => {
  data.textContent = getWeather();
});