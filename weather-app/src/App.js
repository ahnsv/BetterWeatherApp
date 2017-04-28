import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/readable/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      temperature: undefined,
      humidity: undefined,
      wind: undefined,
      activePlace: 0
    };
  }
  static defaultProps = {
      city: 'Boston',
    };
 _getWeatherInfo = (city) => {
     const main = this;
     let query = null;
     main.setState({
         infoStatus: 'loading'
     });
     if (!city || city == '') {
       query = this.props.city;
     } else {
       query = city;
     }
     fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=50a34e070dd5c09a99554b57ab7ea7e2`)
     .then( function(response) {
       return response;
     })
     .then( function(response) {
       setTimeout( function() {
         main.setState({
         infoStatus: 'loaded'
       });
       }, 300);
       return response.json();
     })
     .then( function(data) {
       main.setState({
         city: data.name,
         country: data.sys.country,
         description: data.weather[0].description,
         temperature: data.main.temp,
         low: data.main.temp_min,
         high: data.main.temp_max,
         humidity: data.main.humidity,
         wind: data.wind.speed,
       });
     })
     .catch( function() {
       main.setState({
         infoStatus: 'error'
       });
     })
   };

      componentWillMount() {
          this._getWeatherInfo();
        };
        _handleSubmit = (event) => {
          event.preventDefault();
          this._getWeatherInfo(event.target.search.value);
        };
  render() {
    const activePlace = this.state.activePlace;
    const {
          city,
          country,
          description,
          temperature,
          low,
          high,
          humidity,
          wind,
          infoStatus,
        } = this.state;
        let data = null;
        if (infoStatus == 'loaded') {
         data = <div>
             <h1>
               {description} in {city}
             </h1>
             <p>Current: {temperature}°C</p>
             <p>Low: {low}°C</p>
             <p>High: {high}°C</p>
             <p>Humidity: {humidity}%</p>
             <p>Wind Speed: {wind} mi/hr</p>
           </div>
        } else if (infoStatus == 'loading') {
          data = <div className="info loading">Loading weather data...</div>
        } else if (infoStatus == 'error') {
          data = <div className="info error">Error while loading weather data. Try again later.</div>
        }
    return (
      <div className="weatherApp">
         <Navbar>
             <Navbar.Header>
               <Navbar.Brand>
                 Location-Based Weather App
               </Navbar.Brand>
             </Navbar.Header>
          </Navbar>
         <Grid>
            <Row>
                <div className="weatherQuery">
                <Col md={4} sm={4}>
                      <h3>Select a city</h3>
                      <Nav
                       bsStyle="pills"
                       stacked
                       activeKey={activePlace}
                       onSelect={index => {
                         this.setState({ city: PLACES.name });
                       }}
                     >
                       {PLACES.map((place, index) => (
                         <NavItem key={index} eventKey={index}>{place.name}</NavItem>
                       ))}
                     </Nav>
                      <form onSubmit={this._handleSubmit}>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search a City..."
                        />
                      </form>
                </Col>
                </div>
                {data}
            </Row>
         </Grid>
      </div>
    );
  }
}

export default App;
