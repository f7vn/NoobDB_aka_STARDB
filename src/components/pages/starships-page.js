import React, {Component} from 'react'
import Row from '../row'
import {StarshipDetails, StarshipList} from '../sw-components'

export default class StarshipPage extends Component {

    state = {
        selectedItem: null
    };

    onItemSelected = (selectedItem) => {
        this.setState({ selectedItem });
    }

    render () {
        const { selectedItem } = this.state
        return (
            <Row
            left={<StarshipDetails itemId={selectedItem}/>}
            right={<StarshipList onItemSelected={this.onItemSelected}/>} />
        );
    }
}