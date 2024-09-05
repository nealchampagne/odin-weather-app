import { handleError } from "./handleerror";
import { loadingScreen } from "./loadingscreen";

export const getCurrentWeather = async (str) => {
  try {
    // Show loading screen until data comes back
    loadingScreen();

    // Make API call
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${str}/?key=CSDFLBZZSWCSSEZDFPQ22QWZD`,
      { mode: "cors" },
    );

    // Handle rejected API calls
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          "Your query was invalid. Please enter a valid location.",
        );
      } else if (response.status === 401) {
        throw new Error(
          "Unauthorized/Incorrect API key. Please contact the website owner at fakemail.gmail.com for help.",
        );
      } else if (response.status === 429) {
        throw new Error(
          `Too many requests. The site's query limit has been exceeded, please contact the website owner at fakemail.gmail.com for more information.`,
        );
      } else if (response.status === 500) {
        throw new Error(
          `Something went wrong with the weather data server. Please try again later.`,
        );
      } else {
        throw new Error(`Oops! Something went wrong.`);
      }
    } else {
      // Send data back so we can populate current weather display
      const weatherData = await response.json().catch(handleError);
      console.log(weatherData);
      return weatherData;
    }
  } catch (err) {
    // Handle caught errors
    handleError(err);
  }
};
