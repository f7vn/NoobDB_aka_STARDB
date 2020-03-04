import React, {Component} from 'react'
import './people-page.css'
import ItemList from '../item-list';
import PersonDetails from '../person-details';
import ErrorIndicator from '../error-indicator'
export default class PeoplePage extends Component{

    state = {
        selectedPerson: 3,
        hasError: false,
    };

    onPersonSelected = (id) => {
        this.setState({selectedPerson: id})
      };
    
    componentDidCatch() {
        this.setState({hasError: true,})
    }
    
    render () {
        if (this.state.hasError)
            return <ErrorIndicator />
        return (
        <div>
        <br></br>
        <div className="row mb2 spec">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected}/>
          </div>
          <div className="col-md-6">
            <PersonDetails personId={this.state.selectedPerson}/>
          </div>
        </div>
        </div>
        );
    };
};
