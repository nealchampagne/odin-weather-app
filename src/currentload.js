import { clearChildren } from "./clearchildren";
import moment from "moment-timezone";
import { homeLoad } from "./homeload";

// Grab the weather icons from the icons folder
const reqIcons = require.context('./images/icons', true, /\.svg$/ );
const icons = reqIcons.keys()
  .map(path => ({ path, file: reqIcons ( path ) }) );

// Load current weather using the data fetched by getCurrentWeather
export const currentWeatherLoad = async (weatherData) => {

  const content = document.getElementById('content');

  const topContainer = document.createElement('div');
  const back = document.createElement('button');
  const title = document.createElement('div');
  const dateTime = document.createElement('div');

  const quickView = document.createElement('div');
  const temperatureF = document.createElement('div');
  const temperatureC = document.createElement('div');
  const iconContainer = document.createElement('div');
  const icon = new Image();
  const iconText = document.createElement('div');

  const description = document.createElement('div');

  const dataContainer = document.createElement('div');
  const feelsLike = document.createElement('div');
  const wind = document.createElement('div');
  const highTemp = document.createElement('div');
  const lowTemp = document.createElement('div');
  const humidity = document.createElement('div');
  const precipChance = document.createElement('div');
  const uvIndex = document.createElement('div');
  const sunriseSunset = document.createElement('div');
  
  const tenDay = document.createElement('div');

  // Find the correct icon in the folder by name
  icon.src = icons.find(icon => icon.path === `./${weatherData.currentConditions.icon}.svg`).file;

  clearChildren(content);

  // attach a class to the content box for correct styling
  content.classList.add('currentview');

  topContainer.classList.add('topcontainer');
  back.classList.add('backbutton');
  title.classList.add('title');
  dateTime.classList.add('datetime');

  quickView.classList.add('quickview');
  temperatureF.classList.add('fahrenheit');
  temperatureC.classList.add('celsius');
  iconContainer.classList.add('iconcontainer');
  icon.classList.add('icon');
  iconText.classList.add('icontext');

  description.classList.add('description');

  dataContainer.classList.add('datacontainer');
  feelsLike.classList.add('datafield');
  wind.classList.add('datafield');
  highTemp.classList.add('datafield');
  lowTemp.classList.add('datafield');
  humidity.classList.add('datafield');
  precipChance.classList.add('datafield');
  uvIndex.classList.add('datafield');
  sunriseSunset.classList.add('datafield');

  tenDay.classList.add('tenday');

  // Manipulate time strings in the data into usable formats
  const utcDateTime = moment(weatherData.currentConditions.datetimeEpoch*1000);
  const sunriseString = weatherData.currentConditions.sunrise;
  const sunsetString = weatherData.currentConditions.sunset;
  const splitSunrise = sunriseString.split(/:/);
  const splitSunset = sunsetString.split(/:/);
  const sunriseMoment = moment(weatherData.currentConditions.datetimeEpoch*1000).tz(weatherData.timezone).hours(parseInt(splitSunrise[0])).minutes(parseInt(splitSunrise[1])).seconds(0).milliseconds(0);
  const sunsetMoment = moment(weatherData.currentConditions.datetimeEpoch*1000).tz(weatherData.timezone).hours(parseInt(splitSunset[0])).minutes(parseInt(splitSunset[1])).seconds(0).milliseconds(0);
  
  back.textContent = 'arrow_back';

  // Set data field values based on the data contained in the fetched JSON object
  title.textContent = weatherData.resolvedAddress;
  dateTime.textContent = `${utcDateTime.tz(weatherData.timezone).format('ddd, MMM D [as of] h:mm a z')}`;

  temperatureF.textContent = `${weatherData.currentConditions.temp}°F`;
  temperatureC.textContent = `(${Math.round((weatherData.currentConditions.temp - 32) * (5/9) * 10) / 10}°C)`;
  iconText.textContent = weatherData.currentConditions.conditions;

  description.textContent = weatherData.description;

  feelsLike.textContent = `Feels like:\n ${weatherData.currentConditions.feelslike}°F`
  highTemp.textContent = `High:\n ${weatherData.days[0].tempmax}°F`
  lowTemp.textContent = `Low:\n ${weatherData.days[0].tempmin}°F`
  humidity.textContent = `Humidity:\n ${weatherData.currentConditions.humidity}%`;
  precipChance.textContent = `Precip. chance:\n ${weatherData.currentConditions.precipprob}%`
  uvIndex.textContent = `UV index:\n ${weatherData.currentConditions.uvindex}`
  sunriseSunset.textContent = `Sunrise - Sunset:\n ${sunriseMoment.format('h:mm a')} - ${sunsetMoment.format('h:mm a')}`;

  const windDir = weatherData.currentConditions.winddir;
  let windCompDir;

  // Convert degrees into the 16 common compass directions
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

  wind.textContent = `Wind:\n ${windCompDir} ${weatherData.currentConditions.windspeed} mph`


  content.appendChild(topContainer);
  topContainer.appendChild(back);
  topContainer.appendChild(title);
  content.appendChild(dateTime);

  content.appendChild(quickView);
  quickView.appendChild(temperatureF);
  quickView.appendChild(temperatureC);
  quickView.appendChild(iconContainer);
  iconContainer.appendChild(icon);
  iconContainer.appendChild(iconText);

  content.appendChild(description);

  content.appendChild(dataContainer);
  dataContainer.appendChild(feelsLike);
  dataContainer.appendChild(highTemp);
  dataContainer.appendChild(humidity);
  dataContainer.appendChild(uvIndex);
  dataContainer.appendChild(wind);
  dataContainer.appendChild(lowTemp);
  dataContainer.appendChild(precipChance);
  dataContainer.appendChild(sunriseSunset);

  content.appendChild(tenDay);

  /** Iterate through the next ten days and populate high and low
   *  temps as well as the weather summary icon */
  for (let i = 1; i < 11; i++) {

    const dailyContainer = document.createElement('div');
    const dailyDate = document.createElement('div');
    const dailyIcon = new Image();
    const tempContainter = document.createElement('div');
    const hiTempF = document.createElement('div');
    const hiTempC = document.createElement('div');
    const loTempF = document.createElement('div');
    const loTempC = document.createElement('div');

    const today = moment(weatherData.currentConditions.datetimeEpoch*1000);

    dailyContainer.classList.add('dailycontainer');
    dailyDate.classList.add('dailydate');
    dailyIcon.classList.add('dailyicon');
    tempContainter.classList.add('tempcontainer');
    hiTempF.classList.add('dailyf', 'high');
    hiTempC.classList.add('dailyc', 'high');
    loTempF.classList.add('dailyf', 'low');
    loTempC.classList.add('dailyc', 'low');

    dailyDate.textContent = `${(today.add(i, 'days')).tz(weatherData.timezone).format('ddd')}`
    dailyIcon.src = icons.find(icon => icon.path === `./${weatherData.days[i].icon}.svg`).file;
    hiTempF.textContent = `${Math.round(weatherData.days[i].tempmax)}°F`
    hiTempC.textContent = `${Math.round((weatherData.days[i].tempmax - 32) * (5/9))}°C`
    loTempF.textContent = `${Math.round(weatherData.days[i].tempmin)}°F`
    loTempC.textContent = `${Math.round((weatherData.days[i].tempmin - 32) * (5/9))}°C`

    tenDay.appendChild(dailyContainer);
    dailyContainer.appendChild(dailyDate);
    dailyContainer.appendChild(dailyIcon);
    dailyContainer.appendChild(tempContainter);
    tempContainter.appendChild(hiTempF);
    tempContainter.appendChild(hiTempC);
    tempContainter.appendChild(loTempF);
    tempContainter.appendChild(loTempC);
  };

  back.addEventListener('click', () => {
    content.classList.remove('currentview');
    homeLoad();
  });
};