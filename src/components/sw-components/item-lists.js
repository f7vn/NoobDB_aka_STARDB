import React from 'react'
import {withData} from '../hoc-helper'
import SwapiService from '../../services/swapi-service'
import ItemList from '../item-list'
const swapiService = new SwapiService();

const {
    getAllPeople, 
    getAllPlanets, 
    getAllStarships} =  swapiService;



const withChildFunction = (Wrapped, fn ) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

const renderName = ({name}) => <span>{name}</span>;
const renderNameAndModel = ({name , model}) => <span>{name} ({model})</span>
// const ListWithChildren = withChildFunction(
//     ItemList,
//     renderName
// );

const PersonList = withData(withChildFunction(
    ItemList,
    renderName
), getAllPeople);
const PlanetList = withData(withChildFunction(
    ItemList,
    renderName
), getAllPlanets);
const StarshipList =  withData(withChildFunction(
    ItemList,
    renderNameAndModel
), getAllStarships);



export {PersonList, PlanetList, StarshipList}