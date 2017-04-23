import React, { Component } from 'react';
import img from './sf.jpg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {city: 'San Francisco', weather: '27'};
  }

  clicked(val) {
    this.setState({weather: val})
    console.log(val);
  }

  render() {
    var self = this;
    return (
      <div className="App">
        <div className="App-header">
          <div className="Temp-text"> {this.state.weather}&#176; </div>
          <div className="City-text"> {this.state.city} </div>
        </div>
        <div className="App-body">
          <div className="Day-item" onClick={self.clicked.bind(self, 27)}>
            <div className="Day-text"> Mon </div>
            <div className="Day-temp"> 27&#176; </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 55)}>
            <div className="Day-text"> Tue </div>
            <div className="Day-temp"> 55&#176; </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 45)}>
            <div className="Day-text"> Wed </div>
            <div className="Day-temp"> 45&#176; </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 47)}>
            <div className="Day-text"> Thu </div>
            <div className="Day-temp"> 47&#176; </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 52)}>
            <div className="Day-text"> Fri </div>
            <div className="Day-temp"> 52&#176; </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 86)}>
            <div className="Day-text"> Sat </div>
            <div className="Day-temp"> 86&#176; </div>
          </div>
          <div className="Day-item" onClick={self.clicked.bind(self, 97)}>
            <div className="Day-text"> Sun </div>
            <div className="Day-temp"> 97&#176; </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
