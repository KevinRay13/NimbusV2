import React, { Component } from 'react';
import axios from 'axios';

import './App.scss';
import Titles from './components/Titles';
import Weather from './components/Weather';
import Form from './components/Form';
const Api_Key = '9415d751026da5d031c099c2123b7a9b';

class App extends Component {
  constructor() {
    super();
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined
    };
  }
  // sendWeather = e =>{

  // }
  getWeather = e => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&units=imperial`
      )
      .post('/webhook', function(req, res) {
        console.log('recieved a post request');
        if (!req.body) return res.sendStatus(400);
        res.setHeader('Content-Type', 'application/json');
        console.log('here is the post req from dialog flow');
        console.log(req.body);
        console.log(
          'got geocity location from param from dialoge flow' +
            req.body.queryResult.paramaters['geo-city']
        );
        let response = '';
        let responseObj = {
          fulfillmentText: response,
          fulfillmentMessages: [{ text: { text: [this.state.city] } }],
          source: ''
        };
        console.log('here is the response to dflow', responseObj);
      })
      .then(res => {
        console.log(res.data);
        const response = res.data;

        this.setState({
          temperature: response.main.temp,
          city: response.name,
          country: response.sys.country,
          humidity: response.main.humidity,
          description: response.weather[0].description,
          error: ''
        });
      });
    e.preventDefault();
  };

  render() {
    console.log(this.getWeather);
    return (
      <div id='main'>
        <div className='App'>
          <div className='box'>
            <Titles />
            <Form loadWeather={this.getWeather} />
            <div className='weatherMain'>
              <Weather
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
        {/* </main> */}
      </div>
    );
  }
}

export default App;
