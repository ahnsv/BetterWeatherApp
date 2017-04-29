import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/cosmo/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import WeatherIcons from 'react-weathericons';


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
         description: data.weather[0].main,
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
             <WeatherIcons name="cloud" size="2x" />
             <h2>Current: {temperature}°C</h2>
             <h3>Low: {low}°C High: {high}°C</h3>
             <p>Humidity: {humidity}%  </p>
             <p>Wind Speed: {wind} mi/hr  </p>
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
                      <h1>Search a city<span>
                      <form onSubmit={this._handleSubmit}>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search a City..."
                        />
                      </form>
                      </span>
                      </h1>
                </div>
                {data}
            </Row>
         </Grid>
      </div>
    );
  }
}

export default App;
