import React, { Component } from 'react';
import moment from 'moment';

import earthquakes from '../data/earthquakes';

const quakes = earthquakes.features.map(quake => {
    return (
        <div className="col-sm-6" key={quake.id}>
            <div className="card" >
                <div className="card-block">
                    <h4 className="card-title">{quake.properties.place}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Magnitude: {quake.properties.mag}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Time: {moment(quake.properties.time).format('llll')}</h6>
                    <p className="card-text">Coordinates: {quake.geometry.coordinates}</p>

                    <a href={quake.properties.url} className="card-link">USGS Event Link</a>

                </div>
            </div>
        </div>
    )
});

export default class EarthquakeList extends Component {
    constructor() {
        super();
        this.state = {
            recentQuakes: []
        }
    }
    componentWillMount() {
        let recentQuakes = [];

        fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
            .then((resp) => resp.json())

            .then(async (data) => {
                await data;
                for (let i = 0; i < data.features.length; i++) {
                    recentQuakes.push(data.features[i]);
                }
                this.setState({ recentQuakes })
            });
    }
    recentQuakesMapped() {
        return this.state.recentQuakes.map(quake => {
            return (
                <div className="col-sm-6" key={quake.id}>
                    <div className="card" >
                        <div className="card-block">
                            <h4 className="card-title">{quake.properties.place}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Magnitude: {quake.properties.mag}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Time: {moment(quake.properties.time).format('llll')}</h6>
                            <p className="card-text">Coordinates: {quake.geometry.coordinates}</p>

                            <a href={quake.properties.url} className="card-link">USGS Event Link</a>

                        </div>
                    </div>
                </div>
            )
        });
    }
    render() {
        if (this.state.recentQuakes.length === 0) {
            return (
                <div>Loading</div>
            )
        } else {
            return (
                <div className="quake-list">
                <div className="row">
                        { quakes }
                    </div>
                    <div className="earthquake-title">
                        This is a list of all the earthquakes in the last hour. 
                    </div>
                    <div className="row">
                        {this.recentQuakesMapped()}
                    </div>
                    
                </div>
            )
        }

    }
}