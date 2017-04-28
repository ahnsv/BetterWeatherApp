import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/readable/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col, FormControl } from "react-bootstrap";
// import CityList from '../public/city.list.json';
/*
{
  "id": 4183849,
  "name": "Boston",
  "country": "US",
  "coord": {
    "lon": -83.789886,
    "lat": 30.791861
  }
}
*/

const PLACES = [
  { name: "San Francisco", zip: "94016", coord: {
    lon: -122.45108,
    lat: 37.766602
  }},
  { name: "Chestnut Hill",
    zip: "02467",
    coord: {
    lon: -83.789886,
    lat: 30.791861
  }},
  { name: "New York", zip: "10016", coord: {
    lon: -75.499901,
    lat: 43.000351
  }},
  { name: "Seattle", zip: "98111", coord: {
    lon: -122.332069,
    lat: 47.606209
  }}
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null,
      background: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const coord = this.props.coord;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" +
      zip +
      "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    const cityNameURL = "http://api.openweathermap.org/data/2.5/weather?q=" + this.input + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    const backgroundURL = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.photosForLocation&api_key=2a62caf5b918200cfe242d1e9e52306f&lat=" + coord.lon + "&lon=" + coord.lat + "&accuracy=11&format=json&nojsoncallback=true";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json });
    });
   //  fetch(cityNameURL).then(res => res.json()).then(json => {
   //    this.setState({ weatherData: json });
   //  });
    fetch(backgroundURL).then(res => res.json()).then(json => {
      this.setState({ background: json });
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    const background = this.state.background;
    console.log(background);
    if (!weatherData) return <div>Loading</div>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        {background}
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconUrl} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°</p>
        <p>High: {weatherData.main.temp_max}°</p>
        <p>Low: {weatherData.main.temp_min}°</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    );  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0,
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Location-Based Weather App
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                ))}
              </Nav>
              <FormControl
              placeholder="Enter City"
              bsStyle="input"
              bsSize="sm"
              inputRef={ref => { this.input = ref; }}
              ></FormControl>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay key={activePlace} zip={PLACES[activePlace].zip} coord={PLACES[activePlace].coord}/>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
