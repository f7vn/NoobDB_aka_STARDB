import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import PeoplePage from "../people-page";
import ErrorButton from "../error-button";
import "./app.css";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";
import ItemDetails, { Record } from "../item-details";
import ItemList from "../item-list";

import {
  PersonList,
  PlanetList,
  StrashipList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails} from '../sw-components'
  
  import { SwapiServiceProvider } from '../swapi-service-context'

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  componentDidCatch() {
    console.log("CompDiDCatch()");
    this.setState({ hasError: true });
  }

  render() {
    const {
      getPerson,
      getPersonImage,
      getStarship,
      getStarshipImage,
      getAllPeople,
      getAllPlanets
    } = this.swapiService;

    if (this.state.hasError) return <ErrorIndicator />;

    const personDetails = (
      <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId={5}
        getData={getStarship}
        getImageUrl={getStarshipImage}>
        <Record field="model" label="Model:" />
        <Record field="length" label="Eye Length" />
        <Record field="costInCredits" label="Cost" />
      </ItemDetails>
    );

    // const planetsList = (
    //   <ItemList getData={getAllPlanets} onItemSelected={() => {}}>
    //     {({ name }) => <span>{name}</span>}
    //   </ItemList>
    // );

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <div>
            <Header />
            <PlanetList />
            {/* <StrashipList />
            <PersonList /> */}
            <StarshipDetails itemId={11} />
            <PersonDetails itemId={11} />
            <PlanetDetails itemId={11} />
            {/* <Row left={"planetsList"} right={peopleList} /> */}
          </div>
        </SwapiServiceProvider >
      </ErrorBoundry>
    );
  }
}
