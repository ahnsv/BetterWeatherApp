import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootswatch/cosmo/bootstrap.css";
import { OverlayTrigger, Popover } from "react-bootstrap";
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
         day1: {
            day: undefined,
            min: undefined,
            max: undefined,
            id: undefined
         },
         day2: {
            day: undefined,
            min: undefined,
            max: undefined,
            id: undefined
         },
         day3: {
            day: undefined,
            min: undefined,
            max: undefined,
            id: undefined
         },
         day4: {
            day: undefined,
            min: undefined,
            max: undefined,
            id: undefined
         },
         day5: {
            day: undefined,
            min: undefined,
            max: undefined,
            id: undefined
         },
         day6: {
            day: undefined,
            min: undefined,
            max: undefined,
            id: undefined
         },
         day7: {
            day: undefined,
            min: undefined,
            max: undefined,
            id: undefined
         }
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
    if (this.state.toggle === true && this.state.index === index) {
      this.setState({
         toggle: false
      });
      this._toggleDiv();
    }
    if (this.state.toggle === false && this.state.idex !== index) {
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
      if (city === "Boston") {
        this.setState({image: './boston_morning.jpg'});
      }
      else if (city === "San Francisco") {
        this.setState({image: './sf.jpg'});
      }
      else if (city === "Chicago") {
        this.setState({image: './city_photos/chicago_day.jpg'});
      }
      else if (city === "Dallas") {
        this.setState({image: './city_photos/dallas_day.jpg'});
      }
      else if (city === "Houston") {
        this.setState({image: './city_photos/houston_day.jpg'});
      }
      else if (city === "Los Angeles") {
        this.setState({image: './city_photos/LA_day.jpg'});
      }
      else if (city === "Philadelphia") {
        this.setState({image: './city_photos/philly_day.jpg'});
      }
      else if (city === "Phoenix") {
        this.setState({image: './city_photos/phoenix_day.jpg'});
      }
      else if (city === "San Diego") {
        this.setState({image: './city_photos/sandiego_day.jpg'});
      }
      else if (city === "Vienna") {
        this.setState({image: './city_photos/vienna.jpg'});
      }
      else {
        this.setState({image: './newyork_morning.jpg'});
      }
    }  else {
      if (city === "Boston") {
         console.log("Boston Evening");
        this.setState({image: './boston_evening.jpg'});
      }
      else if (city === "San Fracisco") {
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
     if (!city || city === '') {
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
     .then( function(data) {
        let sunrise = main.state.sunrise;
        console.log("sunrise: ", sunrise);
        let sunset = main.state.sunset;
        console.log("sunset: ", sunset);

        let Sr = new Date(sunrise*1000);
        let Srhours = Sr.getHours();
        let Srmins = "0" + Sr.getMinutes();
        let formattedTime = Srhours + ':' + Srmins.substr(-2) + " AM";
        console.log(formattedTime);
        main.setState({ sunrise: formattedTime});

        let Ss = new Date(sunset*1000);
        let Sshours = Ss.getHours() - 12;
        let Ssmins = "0" + Ss.getMinutes();
        let formattedTime2 = Sshours + ':' + Ssmins.substr(-2) + " PM";
        console.log(formattedTime2);
        main.setState({ sunset: formattedTime2});
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
      if (!city || city === '') {
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
         //   const data = main.state.forecast;
            console.log(response.list);
           main.setState({
             forecast: {
                day1: {
                   day: response.list[0].temp.day,
                   min: response.list[0].temp.min,
                   max: response.list[0].temp.max,
                   id: response.list[0].weather[0].id
                },
                day2: {
                   day: response.list[1].temp.day,
                   min: response.list[1].temp.min,
                   max: response.list[1].temp.max,
                   id: response.list[1].weather[0].id
                },
                day3: {
                   day: response.list[2].temp.day,
                   min: response.list[2].temp.min,
                   max: response.list[2].temp.max,
                   id: response.list[2].weather[0].id
                },
                day4: {
                   day: response.list[3].temp.day,
                   min: response.list[3].temp.min,
                   max: response.list[3].temp.max,
                   id: response.list[3].weather[0].id
                },
                day5: {
                   day: response.list[4].temp.day,
                   min: response.list[4].temp.min,
                   max: response.list[4].temp.max,
                   id: response.list[4].weather[0].id
                },
                day6: {
                   day: response.list[5].temp.day,
                   min: response.list[5].temp.min,
                   max: response.list[5].temp.max,
                   id: response.list[5].weather[0].id
                },
                day7: {
                   day: response.list[6].temp.day,
                   min: response.list[6].temp.min,
                   max: response.list[6].temp.max,
                   id: response.list[6].weather[0].id
                }
          }})
       })
      .catch( function() {
         main.setState({
           infoStatus: 'error'
         });
      });
    }

   setSunRiseAndSetTime = (city) => {
      const main = this;
      let query = null;
      main.setState({
          infoStatus: 'loading'
      });
      if (!city || city === '') {
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
        return response.json();
      })
      .then((data) => {
         // console.log(response);
         let sunrise = data.sys.sunrise;
         console.log("sunrise: ", sunrise);
         // let sunset = main.state.sunset;
         let Sr = new Date(sunrise*1000);
         let Srhours = Sr.getHours();
         let Srmins = "0" + Sr.getMinutes();
         let formattedTime = Srhours + ':' + Srmins.substr(-2) + " AM";
         this.setState({ sunrise: formattedTime});
         console.log("this.state.sunrise: ", this.state.sunrise);
         let sunset = data.sys.sunset;
         console.log("sunset: ", sunset);
         let Ss = new Date(sunset*1000);
         let Sshours = Ss.getHours() - 12;
         let Ssmins = "0" + Ss.getMinutes();
         let formattedTime2 = Sshours + ':' + Ssmins.substr(-2) + " PM";
         this.setState({ sunset: formattedTime2});
         console.log("this.state.sunset: ", this.state.sunset);
      });
   }

   changeMap(city) {
      let lon = 0;
      let lat = 0;
      const main = this;
      let query = null;
      main.setState({
          infoStatus: 'loading'
      });
      if (!city || city === '') {
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

       let temperature, low, high, day1, day2, day3, day4, day5, day6, day7, min1, min2, min3, min4, min5, min6, min7, max1, max2, max3, max4, max5, max6, max7 = 0;
       let id1 = this.state.forecast.day1.id;
       let id2 = this.state.forecast.day2.id;
       let id3 = this.state.forecast.day3.id;
       let id4 = this.state.forecast.day4.id;
       let id5 = this.state.forecast.day5.id;
       let id6 = this.state.forecast.day6.id;
       let id7 = this.state.forecast.day7.id;
       let newFormat = '';

       if (format === 'C') {
         temperature = (this.state.temperature * (9/5) + 32).toFixed(2);
         low = (this.state.low * (9/5) + 32).toFixed(2);
         high = (this.state.high * (9/5) + 32).toFixed(2);
         day1 = (this.state.forecast.day1.day * (9/5) + 32).toFixed(2);
         day2 = (this.state.forecast.day2.day * (9/5) + 32).toFixed(2);
         day3 = (this.state.forecast.day3.day * (9/5) + 32).toFixed(2);
         day4 = (this.state.forecast.day4.day * (9/5) + 32).toFixed(2);
         day5 = (this.state.forecast.day5.day * (9/5) + 32).toFixed(2);
         day6 = (this.state.forecast.day6.day * (9/5) + 32).toFixed(2);
         day7 = (this.state.forecast.day7.day * (9/5) + 32).toFixed(2);
         min1 = (this.state.forecast.day1.min * (9/5) + 32).toFixed(2);
         min2 = (this.state.forecast.day2.min * (9/5) + 32).toFixed(2);
         min3 = (this.state.forecast.day3.min * (9/5) + 32).toFixed(2);
         min4 = (this.state.forecast.day4.min * (9/5) + 32).toFixed(2);
         min5 = (this.state.forecast.day5.min * (9/5) + 32).toFixed(2);
         min6 = (this.state.forecast.day6.min * (9/5) + 32).toFixed(2);
         min7 = (this.state.forecast.day7.min * (9/5) + 32).toFixed(2);
         max1 = (this.state.forecast.day1.max * (9/5) + 32).toFixed(2);
         max2 = (this.state.forecast.day2.max * (9/5) + 32).toFixed(2);
         max3 = (this.state.forecast.day3.max * (9/5) + 32).toFixed(2);
         max4 = (this.state.forecast.day4.max * (9/5) + 32).toFixed(2);
         max5 = (this.state.forecast.day5.max * (9/5) + 32).toFixed(2);
         max6 = (this.state.forecast.day6.max * (9/5) + 32).toFixed(2);
         max7 = (this.state.forecast.day7.max * (9/5) + 32).toFixed(2);
         newFormat = 'F';
       } else {
         temperature = ((this.state.temperature - 32) * (5/9)).toFixed(2);
         low = ((this.state.low - 32) * (5/9)).toFixed(2);
         high = ((this.state.high - 32) * (5/9)).toFixed(2);
         day1 = ((this.state.forecast.day1.day - 32) * (5/9)).toFixed(2);
         day2 = ((this.state.forecast.day2.day - 32) * (5/9)).toFixed(2);
         day3 = ((this.state.forecast.day3.day - 32) * (5/9)).toFixed(2);
         day4 = ((this.state.forecast.day4.day - 32) * (5/9)).toFixed(2);
         day5 = ((this.state.forecast.day5.day - 32) * (5/9)).toFixed(2);
         day6 = ((this.state.forecast.day6.day - 32) * (5/9)).toFixed(2);
         day7 = ((this.state.forecast.day7.day - 32) * (5/9)).toFixed(2);
         min1 = ((this.state.forecast.day1.min - 32) * (5/9)).toFixed(2);
         min2 = ((this.state.forecast.day2.min - 32) * (5/9)).toFixed(2);
         min3 = ((this.state.forecast.day3.min - 32) * (5/9)).toFixed(2);
         min4 = ((this.state.forecast.day4.min - 32) * (5/9)).toFixed(2);
         min5 = ((this.state.forecast.day5.min - 32) * (5/9)).toFixed(2);
         min6 = ((this.state.forecast.day6.min - 32) * (5/9)).toFixed(2);
         min7 = ((this.state.forecast.day7.min - 32) * (5/9)).toFixed(2);
         max1 = ((this.state.forecast.day1.max - 32) * (5/9)).toFixed(2);
         max2 = ((this.state.forecast.day2.max - 32) * (5/9)).toFixed(2);
         max3 = ((this.state.forecast.day3.max - 32) * (5/9)).toFixed(2);
         max4 = ((this.state.forecast.day4.max - 32) * (5/9)).toFixed(2);
         max5 = ((this.state.forecast.day5.max - 32) * (5/9)).toFixed(2);
         max6 = ((this.state.forecast.day6.max - 32) * (5/9)).toFixed(2);
         max7 = ((this.state.forecast.day7.max - 32) * (5/9)).toFixed(2);
         newFormat = 'C';
       }

       this.setState({
         format: newFormat,
         temperature: temperature,
         low: low,
         high: high,
         forecast: {
            day1: {
               day: day1,
               min: min1,
               max: max1,
               id: id1
            },
            day2: {
               day: day2,
               min: min2,
               max: max2,
               id: id2
            },
            day3: {
               day: day3,
               min: min3,
               max: max3,
               id: id3
            },
            day4: {
               day: day4,
               min: min4,
               max: max4,
               id: id4
            },
            day5: {
               day: day5,
               min: min5,
               max: max5,
               id: id5
            },
            day6: {
               day: day6,
               min: min6,
               max: max6,
               id: id6
            },
            day7: {
               day: day7,
               min: min7,
               max: max7,
               id: id7
            }
         }
       })
     }


   componentWillMount() {
       this._getWeatherInfo();
       this.fetchWeather();
     };

   _handleSubmit = (event) => {

    if (this.state.toggle === false) {
      this.setState({toggle: true});
      this._toggleDiv();
    }
    this.setCity(event.target.search.value);
    event.preventDefault();
    this._getWeatherInfo(event.target.search.value);
    this.fetchWeather(event.target.search.value);
    this.setSunRiseAndSetTime(event.target.search.value);
   //  this.changeTimeFormat();
   //  this.changeTimeFormat();
    this.changeMap(event.target.search.value);
   };

  render() {
    var self = this;
    const {city, country, description, temperature, low, high, humidity, wind, infoStatus, format, weather, image, toggle,
    index, pressure, visibility, clouds, sunrise, sunset, forecast, coord} = this.state;
    const {day1, day2, day3, day4, day5, day6, day7} = this.state.forecast;
    const {lat, lon} = this.state.coord;
    let data = null;
    let hr = (new Date).getHours();
    let tod = (hr >= 17) ? 'night' : 'day';
    // dealing with date/time/month
    let d = new Date();
    let date = d.getDate();
    let strDate = date.toString();
    let m = d.getMonth();
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
   //  let month = months[m];
    let day = d.getDay();
    let num;
    let weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];


    function daylist(day, num){
      // console.log("date: ", day, "num: ", num, "date+num: ", day+num);
      if (day + num > 6) {
         num = (day+num) % 7;
         // console.log("updated num: ", num);
         return weekday[num];
      }
      return weekday[day + num];
   };

    var n = daylist(date, 0);
    var n2 = daylist(date, 1);
    var n3 = daylist(date, 2);
    var n4 = daylist(date, 3);
    var n5 = daylist(date, 4);
    var n6 = daylist(date, 5);
    var n7 = daylist(date, 6);

    num = 0;

    function dateHandler(date, num) {
       let result = "";
      //  console.log(months[m]);
       switch (months[m]){
          case "Jan" || "Mar" || "May" || "Jul" || "Aug" || "Oct" || "Dec":
             if (date + num > 31) m++;
             break;
          case "Apr" || "Jun" || "Sep" || "Nov":
             if (date + num > 30) m++;
             break;
          case "Feb":
             if (date + num > 29) m++;
             break;
       }
       let temp = date+num;
       strDate = temp.toString();
       if (date+num == 1) strDate = strDate + "st";
       if (date+num == 2) strDate = strDate + "nd";
       if (date+num == 3) strDate = strDate + "rd";
       else strDate = strDate + "th";
       result = months[m] + " " + strDate;
      //  console.log("result: ", result);
       return result;
    }

    var d1 = dateHandler(date, 1);
    var d2 = dateHandler(date, 2);
    var d3 = dateHandler(date, 3);
    var d4 = dateHandler(date, 4);
    var d5 = dateHandler(date, 5);
    var d6 = dateHandler(date, 6);
    var d7 = dateHandler(date, 7);


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
     <Popover id="popover-positioned-top" title={d1}>
       <strong>Average: {day1.day}°{format}</strong><br />
       High: {day1.max}°{format} Low: {day1.min}°{format}
     </Popover>
   );
   const popoverTop2 = (
    <Popover id="popover-positioned-top" title={d2}>
      <strong>Average: {day2.day}°{format}</strong><br />
      High: {day2.max}°{format} Low: {day2.min}°{format}
    </Popover>
  );
   const popoverTop3 = (
    <Popover id="popover-positioned-top" title={d3}>
      <strong>Average: {day3.day}°{format}</strong><br />
      High: {day3.max}°{format} Low: {day3.min}°{format}
    </Popover>
  );
   const popoverTop4 = (
   <Popover id="popover-positioned-top" title={d4}>
      <strong>Average: {day4.day}°{format}</strong><br />
      High: {day4.max}°{format} Low: {day4.min}°{format}
   </Popover>
   );
   const popoverTop5 = (
   <Popover id="popover-positioned-top" title={d5}>
      <strong>Average: {day5.day}°{format}</strong><br />
      High: {day5.max}°{format} Low: {day5.min}°{format}
   </Popover>
   );
   const popoverTop6 = (
   <Popover id="popover-positioned-top" title={d6}>
      <strong>Average: {day6.day}°{format}</strong><br />
      High: {day6.max}°{format} Low: {day6.min}°{format}
   </Popover>
   );
   const popoverTop7 = (
   <Popover id="popover-positioned-top" title={d7}>
      <strong>Average: {day7.day}°{format}</strong><br />
      High: {day7.max}°{format} Low: {day7.min}°{format}
   </Popover>
   );

    // Create a new JavaScript Date object based on the timestamp
   // multiplied by 1000 so that the argument is in milliseconds, not seconds.

     if (infoStatus === 'loaded') {

      data = <div>
          <h2><b>{description} in {city}, {country} <i id='icon1' className={'wi wi-owm-' + tod + '-' + this.state.weather.id}></i></b><br />Current: {temperature} ˚{format}</h2>
          <h3>Low: {low} ˚{format} High: {high} ˚{format}</h3>
          <h4>Humidity: {humidity}%  </h4>
          <h4>Wind Speed: {wind} mi/hr  </h4>
          <h4>Pressure: {pressure} mb  </h4>
          <h4>Visibility: {visibility} m </h4>
          <h4>Clouds: {clouds}  </h4>
          <h4>Sunrise: {sunrise} </h4>
          <h4>Sunset: {sunset} </h4>
          {temperature &&
       <SwitchFormat changeFormat={this.changeFormat.bind(this)} format={format} />}
        </div>
     } else if (infoStatus === 'loading') {
       data = <div className="info loading">Loading weather data...</div>
    } else if (infoStatus === 'error') {
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
            <button type="submit">Search</button>
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
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop} onClick={self.clicked.bind(self, day1.day, 1)}>
            <div className="Day-item"><div className="Day-text"> {n} </div>
            <i id="forecasticon1" className={'wi wi-owm-' + tod + '-' + day1.id}></i>
            <div className="Day-temp"> {day1.day}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop2} onClick={self.clicked.bind(self, day2.day, 2)}>
            <div className="Day-item"><div className="Day-text"> {n2} </div>
            <i id="forecasticon2" className={'wi wi-owm-' + tod + '-' + day2.id}></i>
            <div className="Day-temp"> {day2.day}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop3} onClick={self.clicked.bind(self, day3.day, 3)}>
            <div className="Day-item"><div className="Day-text"> {n3} </div>
            <i id="forecasticon3" className={'wi wi-owm-' + tod + '-' + day3.id}></i>
            <div className="Day-temp"> {day3.day}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop4} onClick={self.clicked.bind(self, day4.day, 4)}>
            <div className="Day-item"><div className="Day-text"> {n4} </div>
            <i id="forecasticon4" className={'wi wi-owm-' + tod + '-' + day4.id}></i>
            <div className="Day-temp"> {day4.day}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop5} onClick={self.clicked.bind(self, day5.day, 5)}>
            <div className="Day-item"><div className="Day-text"> {n5} </div>
            <i id="forecasticon5" className={'wi wi-owm-' + tod + '-' + day5.id}></i>
            <div className="Day-temp"> {day5.day}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop6} onClick={self.clicked.bind(self, day6.day, 6)}>
            <div className="Day-item"><div className="Day-text"> {n6} </div>
            <i id="forecasticon6" className={'wi wi-owm-' + tod + '-' + day6.id}></i>
            <div className="Day-temp"> {day6.day}°{format}</div></div>
          </OverlayTrigger>
          <OverlayTrigger  trigger={['hover', 'focus']} placement="top" overlay={popoverTop7} onClick={self.clicked.bind(self, day7.day, 7)}>
            <div className="Day-item"><div className="Day-text"> {n7} </div>
            <i id="forecasticon7" className={'wi wi-owm-' + tod + '-' + day7.id}></i>
            <div className="Day-temp"> {day7.day}°{format}</div></div>
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
