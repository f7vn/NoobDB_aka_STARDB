import React, { Component } from "react";
import  { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from "../header";
import RandomPlanet from "../random-planet";
import "./app.css";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import DummySwapiService from "../../services/dummy-swapi-service"
import {PeoplePage, StarshipPage, PlanetPage, SecretPage, LoginPage } from '../pages'
import { SwapiServiceProvider } from '../swapi-service-context'
import { StarshipDetails } from "../sw-components";



export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLogIn: false,
  };

onLogin = () => {
  this.setState({isLogIn: true});
}

  onServiceChange = () => {
    this.setState(({swapiService}) => {
      const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      return {
          swapiService: new Service()
        };
    })    
  };


  render() {
    const { isLogIn } = this.state 
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router >
            <div>
              <Header onServiceChange={this.onServiceChange}/>
              <RandomPlanet />
              <Switch >
                <Route path="/" render={() => <div className="jumborton text-center"> <h2>Welcome to starDB</h2></div>} exact/>
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetPage} />
                <Route path="/starships" component={StarshipPage} exact/>
                <Route path="/starships/:id" 
                    render={({match}) => {
                      const { id } = match.params
                      return <StarshipDetails itemId={id}/>} }/>
                <Route path="/login"  render={() => (
                    <LoginPage isLoggedIn={isLogIn} onLogin={ this.onLogin }/>
                )}/>
                <Route path="/secret" render={() => (
                  <SecretPage isLoggedIn={isLogIn} />
                )}/>
                <Route render={ ()=> {return  <div>PNP</div>}} />
              </ Switch>
            </div>
          </Router>
        </SwapiServiceProvider >
      </ErrorBoundry>
    );
  }
}
