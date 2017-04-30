import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/cosmo/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";
import icon from './images/cloud.png';
import $ from 'jquery';
import './App.css';


class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      temperature: undefined,
      humidity: undefined,
      wind: undefined,
      format: 'C',
      weather: '',
      toggle: true,
      index: 1,
      pressure: undefined,
      visibility: undefined,
      clouds: undefined,
      sunrise: undefined,
      sunset: undefined,
      forecast: {
         day1: undefined,
         day2: undefined,
         day3: undefined,
         day4: undefined,
         day5: undefined,
         day6: undefined
      }
    };
    this._toggleDiv = this._toggleDiv.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

   _toggleDiv() {
    $(this.refs['toggle-div']).slideToggle();
  }

  clicked(val, index) {
    if (this.state.toggle == true && this.state.index == index) {
      this.setState({toggle: false});
      this._toggleDiv();
    }
    if (this.state.toggle == false && this.state.idex != index) {
      this.setState({toggle: true});
      this._toggleDiv();
    }
    this.setState({weather: val, index: index});
    console.log(val);
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
         weather: data.weather[0],
         pressure: data.main.pressure,
         visibility: data.visibility,
         clouds: data.clouds.all,
         sunrise: data.sys.sunrise,
         sunset: data.sys.sunset
       });
     })
     .catch( function() {
       main.setState({
         infoStatus: 'error'
       });
     })
   };

   fetchWeather = (city) => {
      const main = this;
      let query = null;
      main.setState({
          infoStatus: 'loading'
      });
      if (!city || city == '') {
        query = this.props.city;
      } else {
        query = city ;
      }
      fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${query},us&units=metric&cnt=7&appid=50a34e070dd5c09a99554b57ab7ea7e2`)
      .then( function(response) {
        return response;
      })
      .then( function(response) {
        setTimeout( function() {
          main.setState({
          infoStatus: 'loaded'
        });
        }, 300);
      //   console.log(response.json());
        return response.json();
      })
      .then((response) => {
           const data = main.state.forecast;
         //   console.log(response.list);
           main.setState({
             forecast: {
                day1: response.list[0].temp.day,
                day2: response.list[1].temp.day,
                day3: response.list[2].temp.day,
                day4: response.list[3].temp.day,
                day5: response.list[4].temp.day,
                day6: response.list[5].temp.day,
          }})
       })
      .catch( function() {
         main.setState({
           infoStatus: 'error'
         });
      });
    }

   changeTimeFormat(sun){
     if (sun === this.state.sunrise){
        var date = new Date(this.state.sunrise*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        this.setState({ sunrise: formattedTime });
     }
     else {
        var date2 = new Date(this.state.sunset*1000);
        var hours2 = date2.getHours();
        var minutes2 = "0" + date2.getMinutes();
        var formattedTime2 = hours2 + ':' + minutes2.substr(-2);
        this.setState({ sunset: formattedTime2 });
     }
   }

   changeFormat(format) {

       let temperature = 0;
       let low = 0;
       let high = 0;
       let day1 = 0;
       let day2 = 0;
       let day3 = 0;
       let day4 = 0;
       let day5 = 0;
       let day6 = 0;
       let day7 = 0;
       let newFormat = '';

       if (format === 'C') {
         temperature = (this.state.temperature * (9/5) + 32).toFixed(2);
         low = (this.state.low * (9/5) + 32).toFixed(2);
         high = (this.state.high * (9/5) + 32).toFixed(2);
         day1 = (this.state.forecast.day1 * (9/5) + 32).toFixed(2);
         day2 = (this.state.forecast.day2 * (9/5) + 32).toFixed(2);
         day3 = (this.state.forecast.day3 * (9/5) + 32).toFixed(2);
         day4 = (this.state.forecast.day4 * (9/5) + 32).toFixed(2);
         day5 = (this.state.forecast.day5 * (9/5) + 32).toFixed(2);
         day6 = (this.state.forecast.day6 * (9/5) + 32).toFixed(2);
         newFormat = 'F';
       } else {
         temperature = ((this.state.temperature - 32) * (5/9)).toFixed(2);
         low = ((this.state.low - 32) * (5/9)).toFixed(2);
         high = ((this.state.high - 32) * (5/9)).toFixed(2);
         day1 = ((this.state.forecast.day1 - 32) * (5/9)).toFixed(2);;
         day2 = ((this.state.forecast.day2 - 32) * (5/9)).toFixed(2);;
         day3 = ((this.state.forecast.day3 - 32) * (5/9)).toFixed(2);;
         day4 = ((this.state.forecast.day4 - 32) * (5/9)).toFixed(2);;
         day5 = ((this.state.forecast.day5 - 32) * (5/9)).toFixed(2);;
         day6 = ((this.state.forecast.day6 - 32) * (5/9)).toFixed(2);;
         newFormat = 'C';
       }

       this.setState({
         format: newFormat,
         temperature: temperature,
         low: low,
         high: high,
         forecast: {
            day1: day1,
            day2: day2,
            day3: day3,
            day4: day4,
            day5: day5,
            day6: day6,
         }
       })
     }


   componentWillMount() {
       this._getWeatherInfo();
       this.fetchWeather();
     };

   _handleSubmit = (event) => {
    event.preventDefault();
    this._getWeatherInfo(event.target.search.value);
    this.fetchWeather(event.target.search.value);
    this.changeTimeFormat();
   };
  render() {
    let hr = (new Date).getHours()
    let tod = (hr >= 17) ? 'night' : 'day';
    var self = this;

    var appHeader = {
      backgroundImage: `url(sf.jpg)`,
      backgroundSize: "cover",
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      height: "100%",
      width: "100%",
      padding: "20px"
    }

    // Create a new JavaScript Date object based on the timestamp
   // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const {city, country, description, temperature, low, high, humidity, wind, infoStatus, format, weather, pressure, visibility, clouds, sunrise, sunset, forecast} = this.state;
    const {day1, day2, day3, day4, day5, day6} = this.state.forecast;

     let data = null;
     if (infoStatus == 'loaded') {
      data = <div><b>
          <h2>
            {description} in {city}, {country} <i className={'wi wi-owm-' + tod + '-' + this.state.weather.id}></i><p>Current: {temperature} ˚{format}</p>
          </h2>
          <h3>Low: {low} ˚{format} High: {high} ˚{format}</h3>
          <p>Humidity: {humidity}%  </p>
          <p>Wind Speed: {wind} mi/hr  </p>
          <p>Pressure: {pressure} mb  </p>
          <p>Visibility: {visibility} m </p>
          <p>Clouds: {clouds}  </p>
          <p changeTimeFormat={this.changeTimeFormat.bind(this)} sun={sunrise}>Sunrise: {sunrise} </p>
          <p changeTimeFormat={this.changeTimeFormat.bind(this)} sun={sunset}>Sunset: {sunset} </p>
          {temperature &&
       <SwitchFormat changeFormat={this.changeFormat.bind(this)} format={format} />}
        </b>
        </div>
     } else if (infoStatus == 'loading') {
       data = <div className="info loading">Loading weather data...</div>
     } else if (infoStatus == 'error') {
       data = <div className="info error">Error while loading weather data. Try again later.</div>
     }
   //   console.log({forecast});
    return (
      <div className="App">
        <div className="App-header" style={appHeader}>
          <h1><span>
          <form onSubmit={this._handleSubmit}>
            <input
              className="City-input"
              type="text"
              name="search"
              placeholder="Search a city"
            />
            <button type="submit" bsSize="xsmall">Search</button>
          </form>
          </span>
          </h1>
        </div>
        <div className="Side-panel" ref="toggle-div">
          <Grid>
            <Row>
              {data}
            </Row>
          </Grid>
        </div>
        <div className="App-body">
          <div className="Day-item" onClick={self.clicked.bind(self, 27, 1)}>
            <div className="Day-text"> Mon </div>
            <div className="Day-temp"> {temperature}°{format} </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 55, 2)}>
            <div className="Day-text"> Tue </div>
            <div className="Day-temp"> {day1}°{format} </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 45, 3)}>
            <div className="Day-text"> Wed </div>
            <div className="Day-temp"> {day2}°{format} </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 47, 4)}>
            <div className="Day-text"> Thu </div>
            <div className="Day-temp"> {day3}°{format} </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 52, 5)}>
            <div className="Day-text"> Fri </div>
            <div className="Day-temp"> {day4}°{format} </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 52, 5)}>
            <div className="Day-text"> Sat </div>
            <div className="Day-temp"> {day5}°{format} </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 52, 5)}>
            <div className="Day-text"> Sun </div>
            <div className="Day-temp"> {day6}°{format} </div>
          </div>
        </div>
      </div>
    );
  }
}

class SwitchFormat extends React.Component {

  handleChange(e) {
    this.props.changeFormat(e.target.value);
  }

  render() {
    return <button value={this.props.format} onClick={this.handleChange.bind(this)}>Change format</button>;
  }
}


export default App;
