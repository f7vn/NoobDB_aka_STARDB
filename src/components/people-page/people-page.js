import React, {Component} from 'react'
import './people-page.css'
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator'
import SwapiService from '../../services/swapi-service';
import Row from '../row'
import ErrorBoundry from '../error-boundry'

export default class PeoplePage extends Component{

    swapiService = new SwapiService();
    state = {
        selectedPerson: 3,
    };

    onPersonSelected = (id) => {
        this.setState({selectedPerson: id})
      };
    render () {
      const itemList = (
        <ItemList
          onItemSelected={this.onPersonSelected}
          getData={this.swapiService.getAllPeople}
          renderItem={(i) => (
            `${i.name} (${i.birthYear})`
          )}>
       
            {(i) => (
              `${i.name} (${i.birthYear})`
            )}
        </ItemList>
      );

      const personDetails = (
       <ErrorBoundry> 
         <ItemDetails itemId={this.state.selectedPerson}/>
       </ErrorBoundry>
      );

        if (this.state.hasError)
            return <ErrorIndicator />
    
        return (
          <Row left={itemList} right={personDetails}/>
        );
    };
};

