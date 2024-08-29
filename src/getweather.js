export const getWeather = async (str) => {
  const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${str}/?key=CSDFLBZZSWCSSEZDFPQ22QWZD`, {mode: 'cors'});
  const weatherData = await response.json();
  console.log(weatherData);
  return weatherData;
};