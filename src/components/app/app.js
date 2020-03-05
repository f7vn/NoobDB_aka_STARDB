import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import PeoplePage from '../people-page'
import ErrorButton from '../error-button';
import './app.css';
import ErrorIndicator from '../error-indicator';
import SwapiService from '../../services/swapi-service';
import ErrorBoundry from '../error-boundry'
import Row from '../row'
import ItemDetails, { Record } from '../item-details';

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
    const {getPerson, getPersonImage, getStarship, getStarshipImage} = this.swapiService;

    if (this.state.hasError)
      return <ErrorIndicator />

    const personDetails = (
      <ItemDetails itemId={11} 
      getData={getPerson}
      getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails itemId={5} 
      getData={getStarship} 
      getImageUrl={getStarshipImage}>

      </ItemDetails>
    );

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
    <ErrorBoundry>
        <div className='ErrorBoundry'>
          <Header />
          {/* {planet}
          <button
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}>
            Toggle Random Planet
          </button>
          <ErrorButton />
          <br/>
          <PeoplePage /> */}
        <Row left={personDetails} right={starshipDetails}/>
        </div>
    </ErrorBoundry>  
    );
  };
};
