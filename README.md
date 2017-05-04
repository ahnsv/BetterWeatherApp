# Better Weather App

Better Weather App 

Better React Weather App Powered by Dark Sky and OpenWeatherMap API

## Overview

There are numerous simple but beautiful weather web apps around the world, but we wanted to focus on how to make it more functional, simple, and visually appealing at the same time. Therefore, we decided to combine useful weather tools together and rearrange them in a sophisticated way. Our app showcases weather information using two main APIs, Dark Sky Map API and OpenWeatherMap API. Based on client's input, the app renders its view in which detailed weather information including temperature, high/low, humidity, sunrise/set and so on and weather map shows the specific region with additional visual weather information of adjacent regions. 

### Dark Sky Map API

[The Dark Sky API](https://darksky.net/dev/) allows you to look up the weather anywhere on the globe, returning (where available):
* Current weather conditions
* Minute-by-minute forecasts out to one hour
* Hour-by-hour and day-by-day forecasts out to seven days
* Hour-by-hour and day-by-day observations going back decades

We implemented Dark Sky API into displaying not only the city user searched, but also adjacent regions. Users can also see a variety of weather variables, such as temperature, Feels-like Temperature, Precipitation Radar, and so on. When users change the city, the map automatically renders and updates the location.

### OpenWeatherMap API

OWM has a simple and clear weather API for developers to pull out:
* Current weather for more than 200,000 cities, for any location (based on coordination lat/lon)
* 16 days forecast with daily interval, 5 days forecast with 3 hour interval
* Multilingual support – English, Russian, Italian, Spanish, German, Portuguese, Dutch, French, Chinese Traditional, Chinese Simplified etc.

We employed OWM API to pull out the current and next 7-day weather information, based on user’s input. In addition, we tried to change the background image depending on today’s weather of the specific location user put. 

### React-Bootstrap Components

React-Bootstrap is a library of reusable front-end components. Bootstrap is the most popular front-end framework, rebuild for React. We used React-Bootstraps’ components using JSX syntax.



