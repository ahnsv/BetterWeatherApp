import React, { Component } from 'react';
import background1 from '../public/background1.jpg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {city: 'San Francisco', weather: '27'};
}

  componentWillMount() {//most useful?
   // Called  the first time the component is loaded right before the component is added to the page
   console.log('getting cwm ...' + this.state);

   //   Api.get('example.com/api/users').then((data) => {
   //listen();
   //   });
  }

  componentDidMount() {
     // Called after the component has been rendered into the page
     console.log('getting cdm...' + this.state);
     //var button = document.getElementById('button');
     //debugger;
  }

  componentWillReceiveProps(nextProps) {
     // Called when the props provided to the component are changed
     console.log(
        'getting cwr...' + this.state
     );
     if(this.props.userId !== nextProps.userId) {
        //make api call
     }
  }

  componentWillUpdate(nextProps, nextState) {
     // Called when the proprs and/or state change
     console.log('updating...');
     console.log(nextState.text);
  }

  componentWillUnmount() {
     //unlisten();
  }
  clicked(val) {
     console.log(this.state);
    this.setState({
      weather: val});
    //this.forceUpdate();
    //console.log(val);
}

  render() {
    var self = this;
    console.log('rendering');
    return (
      <div className="App">
        <img className="background1" src={background1} />
        <div className="App-header">
          <div className="Temp-text"> {this.state.weather}&#176;</div>
          <div className="City-text"> {this.state.city} </div>
        </div>
        <div className="App-body">
          <input ref="textBox" placeholder="Enter City Name" type="text" />
          <button onClick={ (e) => {this.clicked();}}>Submit</button>
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
