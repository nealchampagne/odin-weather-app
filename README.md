# Odin Weather App

## Description

This is my implementation of the Weather App project from the JavaScript course of the Odin Project's Full Stack JavaScript curriculum.

The app calls Visual Crossing's weather API using a user-provided string to query their database for current weather data.

While waiting for the promise to resolve, the app displays a loading message to the user.

If successful, the JSON object returned from the server is used to populate the datafields to show current weather information for the requested location as well as a 10-day forecast with high and low temps and an informative weather summary icon.

Any errors that come back from the API are displayed to the user in a color-coded modal with an informative error message. When the user closes the message, they are taken back to the search page.

This was a great exercise for learning how to request information from an API, communicate to the user during the loading process, and handle the returned data in addition to any errors that might occur.
