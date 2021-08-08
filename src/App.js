import React, { Component } from 'react';

import './App.scss';
import { Header, PeoplePage, RandomPlanet } from './components/';
import SwapiService from './services/swapiService';

export default class App extends Component {
  swapiService = new SwapiService();

  render() {
    return (
      <div className="App" >
        <Header />
        <RandomPlanet />

        <PeoplePage getData={this.swapiService.getAllPeople} renderItem={(item) => item.name} />
      </div>
    );
  }
}
