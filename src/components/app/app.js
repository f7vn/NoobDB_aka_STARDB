import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page'
import ErrorButton from '../error-button';
import './app.css';
import ErrorIndicator from '../error-indicator';
import ItemList from '../item-list';
import PersonDetails from '../person-details'
import SwapiService from '../../services/swapi-service';

export default class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };


  componentDidCatch() {
    console.log('CompDiDCatch()');
    this.setState({hasError: true})
  };

  render () {
    if (this.state.hasError)
      return <ErrorIndicator />
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <div>
        <Header />
        {planet}
        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <ErrorButton />
        <br/>
        <PeoplePage />
        {/* <div>
        <br></br>
        <div className="row mb2 spec">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} 
            getData={this.swapiService.getAllPlanets} 
            renderItem={(item) => (<span>{item.name}<button>!</button></span>)}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
        </div> */}
      </div>
    );
  };
};
