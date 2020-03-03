import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import './random-planet.css';
import Spinner from '../spinner';

export default class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {},
  };

  constructor() {
    super();
    this.updatePlanet();
  };

  onPlanetLoaded = (planet) => {
    this.setState({planet})
  };

  onError = (err) => {

  }

  updatePlanet() {
   const id = Math.floor(Math.random()*25) + 1;
    this.swapiService.getPlanet(id)
    .then(this.onPlanetLoaded)
    .catch(this.onError);
  };

  render() {
     const { planet: {name, rotationPeriod, population, diameter, id}} = this.state;
  

    return (

      <div className="random-planet jumbotron rounded">
        {/* <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt="sorry"/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">RotationPeriod</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div> */}
        <Spinner />
      </div>
    );
  }
}