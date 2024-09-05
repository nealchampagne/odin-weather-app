import { clearChildren } from "./clearchildren.js";
import { currentWeatherLoad } from "./currentload.js";
import { getCurrentWeather } from "./getcurrentweather.js";
import cloudyeveningsky from "./images/backgrounds/cloudyeveningsky.jpg";
import { handleError } from "./handleerror.js";

// Load initial landing page
export const homeLoad = async () => {
  const container = document.getElementById("container");
  const content = document.getElementById("content");
  const title = document.createElement("div");
  const searchContainer = document.createElement("div");
  const searchIcon = document.createElement("div");
  const search = document.createElement("input");
  const searchBtn = document.createElement("button");

  // Clear children incase we're coming back from somewhere else
  clearChildren(content);

  container.style.background = `url(${cloudyeveningsky})`;
  container.style.backgroundPosition = "center";
  container.style.backgroundSize = "cover";

  title.classList.add("title");
  searchContainer.classList.add("searchcontainer");
  searchIcon.classList.add("searchicon");
  search.className = "search";
  search.setAttribute("id", "search");
  searchBtn.className = "searchbtn";

  title.textContent = "Odin Weather App";
  searchIcon.textContent = "Search";
  searchBtn.textContent = "Get Current Weather";

  // Make API call on submit button click
  searchBtn.addEventListener("click", async () => {
    const weatherData = await getCurrentWeather(search.value);
    if (weatherData) {
      currentWeatherLoad(weatherData).catch(handleError);
    }
  });

  // Make API call on 'Enter' keydown in the search field
  search.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const weatherData = await getCurrentWeather(search.value);
      if (weatherData) {
        currentWeatherLoad(weatherData).catch(handleError);
      }
    }
  });

  content.appendChild(title);
  content.appendChild(searchContainer);
  searchContainer.appendChild(searchIcon);
  searchContainer.appendChild(search);
  content.appendChild(searchBtn);
};
