import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/cosmo/bootstrap.css";
import { PageHeader, Button, OverlayTrigger, Popover, Grid, Row, Col } from "react-bootstrap";
import icon from '../public/cloud.png';
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
      image: './boston_morning.jpg',
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
         day6: undefined,
         day7: undefined
      },
      coord: {
         lat: undefined,
         lon: undefined
      }
    };
    this._toggleDiv = this._toggleDiv.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
  }

  //function for toggling slide panel
   _toggleDiv() {
    $(this.refs['toggle-div']).slideToggle();
  }

  clicked(val, index) {
    if (this.state.toggle == true && this.state.index == index) {
      this.setState({
         toggle: false
      });
      this._toggleDiv();
    }
    if (this.state.toggle == false && this.state.idex != index) {
      this.setState({
         toggle: true
      });
      this._toggleDiv();
    }
    this.setState({index: index});
    console.log(val);
  }

  setCity(city) {
    this.setState({city: city});
    var today = new Date();
    var curHr = today.getHours();
    console.log(curHr);
    if (curHr < 12) {
      if (city == "Boston") {
        this.setState({image: './boston_morning.jpg'});
      }
      else if (city == "San Francisco") {
        this.setState({image: './sf.jpg'});
      }
      else {
        this.setState({image: './newyork_morning.jpg'});
      }
    }  else {
      if (city == "Boston") {
         console.log("Boston Evening");
        this.setState({image: './boston_evening.jpg'});
      }
      else if (city == "San Fracisco") {
        this.setState({image: './sf.jpg'});
      }
      else {
        this.setState({image: './newyork_evening.jpg'});
      }
    }
    console.log("city set to " + city);
  }

   static defaultProps = {
      city: 'Boston',
      image: './sf.jpg'
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
         sunset: data.sys.sunset,
         coord: {
            lat: data.coord.lat,
            lon: data.coord.lon
         }
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
                day7: response.list[6].temp.day
          }})
       })
      .catch( function() {
         main.setState({
           infoStatus: 'error'
         });
      });
    }

   changeTimeFormat(){
        var date = new Date(this.state.sunrise*1000);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = hours + ':' + minutes.substr(-2);
        this.setState({ sunrise: formattedTime });
        console.log("formattedTime is: " + formattedTime);
        var date2 = new Date(this.state.sunset*1000);
        var hours2 = date2.getHours();
        var minutes2 = "0" + date2.getMinutes();
        var formattedTime2 = hours2 + ':' + minutes2.substr(-2);
        this.setState({ sunset: formattedTime2 });
        console.log("formattedTime2 is:" + formattedTime2);
   }

   changeMap(city) {
      let lon = 0;
      let lat = 0;
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
           const data = main.state.coord;
           console.log(data);
           main.setState({
             coord: {
                lat: data.lat,
                lon: data.lon
             }
           })
       })

   }

   changeFormat(format) {

       let temperature, low, high, day1, day2, day3, day4, day5, day6, day7 = 0;
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
         day7 = (this.state.forecast.day7 * (9/5) + 32).toFixed(2);
         newFormat = 'F';
       } else {
         temperature = ((this.state.temperature - 32) * (5/9)).toFixed(2);
         low = ((this.state.low - 32) * (5/9)).toFixed(2);
         high = ((this.state.high - 32) * (5/9)).toFixed(2);
         day1 = ((this.state.forecast.day1 - 32) * (5/9)).toFixed(2);
         day2 = ((this.state.forecast.day2 - 32) * (5/9)).toFixed(2);
         day3 = ((this.state.forecast.day3 - 32) * (5/9)).toFixed(2);
         day4 = ((this.state.forecast.day4 - 32) * (5/9)).toFixed(2);
         day5 = ((this.state.forecast.day5 - 32) * (5/9)).toFixed(2);
         day6 = ((this.state.forecast.day6 - 32) * (5/9)).toFixed(2);
         day7 = ((this.state.forecast.day7 - 32) * (5/9)).toFixed(2);
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
            day7: day7
         }
       })
     }


   componentWillMount() {
       this._getWeatherInfo();
       this.fetchWeather();
     };

   _handleSubmit = (event) => {

    if (this.state.toggle == false) {
      this.setState({toggle: true});
      this._toggleDiv();
    }
    this.setCity(event.target.search.value);
    event.preventDefault();
    this._getWeatherInfo(event.target.search.value);
    this.fetchWeather(event.target.search.value);
    this.changeTimeFormat();
   //  this.changeTimeFormat();
    this.changeMap(event.target.search.value);
   };

  render() {
    var self = this;
    const {city, country, description, temperature, low, high, humidity, wind, infoStatus, format, weather, image, toggle,
    index, pressure, visibility, clouds, sunrise, sunset, forecast, coord} = this.state;
    const {day1, day2, day3, day4, day5, day6, day7} = this.state.forecast;
    const {lat, lon} = this.state.coord
    let data = null;
    let hr = (new Date).getHours()
    let tod = (hr >= 17) ? 'night' : 'day';
    // Need to fix days
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var n = weekday[d.getDay()];
    var n2 = weekday[d.getDay()+1];
    var n3 = weekday[d.getDay()+2];
    var n4 = weekday[d.getDay()+3];
    var n5 = weekday[d.getDay()+4];
    var n6 = weekday[d.getDay()+5];
    var n7 = weekday[d.getDay()-1];

    var appHeader = {
      backgroundImage: 'url(' + this.state.image + ')',
      backgroundSize: "cover",
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      height: "100%",
      width: "100%",
      padding: "20px",
   };
    var iconStyle = {
      width: "50px",
      height: "50px",
      alignSelf: "center",
      backgroundImage: `url(${icon})`,
      backgroundRepeat: "no-repeat"
    };

    const popoverTop = (
     <Popover id="popover-positioned-top" title="May 1st">
       <strong>Average: {day1}</strong><br />
       High: {day1} Low: {day2}
     </Popover>
   );
   const popoverTop2 = (
    <Popover id="popover-positioned-top" title="May 2nd">
      <strong>Average: {day2}</strong><br />
      High: {day1} Low: {day2}
    </Popover>
  );
   const popoverTop3 = (
    <Popover id="popover-positioned-top" title="May 3rd">
      <strong>Average: {day3}</strong><br />
      High: {day1} Low: {day2}
    </Popover>
  );
   const popoverTop4 = (
   <Popover id="popover-positioned-top" title="May 4th">
      <strong>Average: {day4}</strong><br />
      High: {day1} Low: {day2}
   </Popover>
   );
   const popoverTop5 = (
   <Popover id="popover-positioned-top" title="May 6th">
      <strong>Average: {day5}</strong><br />
      High: {day1} Low: {day2}
   </Popover>
   );
   const popoverTop6 = (
   <Popover id="popover-positioned-top" title="May 7th">
      <strong>Average: {day6}</strong><br />
      High: {day1} Low: {day2}
   </Popover>
   );
   const popoverTop7 = (
   <Popover id="popover-positioned-top" title="May 8th">
      <strong>Average: {day7}</strong><br />
      High: {day1} Low: {day2}
   </Popover>
   );

    // Create a new JavaScript Date object based on the timestamp
   // multiplied by 1000 so that the argument is in milliseconds, not seconds.

     if (infoStatus == 'loaded') {

      data = <div>
          <h2><b>{description} in {city}, {country} <i id='icon1' className={'wi wi-owm-' + tod + '-' + this.state.weather.id}></i></b><br />Current: {temperature} ˚{format}</h2>
          <h3>Low: {low} ˚{format} High: {high} ˚{format}</h3>
          <h4>Humidity: {humidity}%  </h4>
          <h4>Wind Speed: {wind} mi/hr  </h4>
          <h4>Pressure: {pressure} mb  </h4>
          <h4>Visibility: {visibility} m </h4>
          <h4>Clouds: {clouds}  </h4>
          <h4 changeTimeFormat={this.changeTimeFormat.bind(this)}>Sunrise: {sunrise} </h4>
          <h4 changeTimeFormat={this.changeTimeFormat.bind(this)}>Sunset: {sunset} </h4>
          {temperature &&
       <SwitchFormat changeFormat={this.changeFormat.bind(this)} format={format} />}
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
              placeholder={this.state.city + ", " + this.state.country}
            />
            <button type="submit" bsSize="xsmall">Search</button>
          </form>
          </span>
          <br />
          <iframe id="embedded-map" width="700px" height="400px" src={"//maps.darksky.net/@temperature,"+ lat + "," + lon + ",11?marker=42.34,-71.159&amp;linkto=maps"}></iframe>
          </h1>
        </div>
        <div className="Side-panel" ref="toggle-div">
          {data}
        </div>
        <div className="App-body">
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop} onClick={self.clicked.bind(self, day1, 1)}>
            <div className="Day-item"><div className="Day-text"> {n} </div>
            <div className="Day-temp"> {day1}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop2} onClick={self.clicked.bind(self, day2, 2)}>
            <div className="Day-item"><div className="Day-text"> {n2} </div>
            <div className="Day-temp"> {day2}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop3} onClick={self.clicked.bind(self, day3, 3)}>
            <div className="Day-item"><div className="Day-text"> {n3} </div>
            <div className="Day-temp"> {day3}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop4} onClick={self.clicked.bind(self, day4, 4)}>
            <div className="Day-item"><div className="Day-text"> {n4} </div>
            <div className="Day-temp"> {day4}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop5} onClick={self.clicked.bind(self, day5, 5)}>
            <div className="Day-item"><div className="Day-text"> {n5} </div>
            <div className="Day-temp"> {day5}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop6} onClick={self.clicked.bind(self, day6, 6)}>
            <div className="Day-item"><div className="Day-text"> {n6} </div>
            <div className="Day-temp"> {day6}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop7} onClick={self.clicked.bind(self, day7, 7)}>
            <div className="Day-item"><div className="Day-text"> {n7} </div>
            <div className="Day-temp"> {day7}°{format}</div></div>
          </OverlayTrigger>
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
    return <button className="formatButton" value={this.props.format} onClick={this.handleChange.bind(this)}>Change format</button>;
  }
}


export default App;
