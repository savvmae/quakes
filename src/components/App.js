import React, { Component } from 'react';
import moment from 'moment';
import EarthquakeList from './EarthquakeList';
import EarthquakeInfo from './EarthquakeInfo';
// import earthquakes from '../data/earthquakes.js';

import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">
          <div className="my-header">EarthQuakes
          </div>
        </div>
        <EarthquakeInfo />
        <EarthquakeList />
      </div>
    );
  }
}

export default App;
