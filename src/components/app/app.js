import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import "./app.css";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import DummySwapiService from "../../services/dummy-swapi-service"
import {PeoplePage, StarshipPage, PlanetPage } from '../pages'

  import { SwapiServiceProvider } from '../swapi-service-context'

export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
          swapiService: new Service()
        };
    })    
  };


  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <div>
            <Header onServiceChange={this.onServiceChange}/>
            <RandomPlanet />
            <PeoplePage />
            <StarshipPage />
            <PlanetPage />
          </div>
        </SwapiServiceProvider >
      </ErrorBoundry>
    );
  }
}
