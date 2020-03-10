import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import ErrorButton from '../error-button'
import './item-details.css';

const Record = ({ item, label, field}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export default class ItemDetails extends Component {

  swapiService = new SwapiService();

  state = {
    item: null,
    image: null,
  };

  updateItem() {
    const {itemId, getData, getImageUrl} = this.props;
    if (!itemId)
      return;
    getData(itemId)
    .then((item) => this.setState({item, image: getImageUrl(item)}))
  };

componentDidMount(){
  this.updateItem();
};

componentDidUpdate(prevItem){
  if (prevItem.itemId !== this.props.itemId || 
    this.props.getData !== prevItem.getData)
    this.updateItem();
};

  render() {
    
    if (!this.state.item)
      return <span>Choose your Fighter</span>
    const {item: { name }, image, item} = this.state;
    return (
      <div className="item-details card">
        <img className="item-image"
          src={image} alt="item"/>

        <div className="card-body">
          <h4>{name} </h4>
          <ul className="list-group list-group-flush">
              { React.Children.map(this.props.children, (child) => React.cloneElement(child, { item }))}
              <ErrorButton />
          </ul>
        </div>
      </div>
    )
  }
}

export {Record};