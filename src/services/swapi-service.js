
export default class SwapiService {

    _apiBase = 'https://swapi.co/api'
    _imgBase = 'https://starwars-visualguide.com/assets/img/'
    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok)
            throw new Error(`Could not fetch ${url}, recived ${res.status}`);
        
        return await res.json();
    };    

    getAllPeople = async () =>  {
        const res = await this.getResource('/people/')
        return res.results.map(this.transformPerson);
    }

    getPerson = async (id) => {
        const res = await  this.getResource(`/people/${id}`);
        return this.transformPerson(res)
    };

    getAllStarships = async () => {
        const res = await this.getResource('/starships/')
        return res.results.map(this.transformStarship);
    }

    getStarship = async (id) => {
        const res = await this.getResource(`/starships/${id}`)
        return this.transformStarship(res)
    };

    getAllPlanets = async () =>  {
        const res = await this.getResource('/planets/')
        return res.results.map(this.transformPlanet);
    }

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}`);
        return this.transformPlanet(planet);
    };

    _extraId(item) {
        const regExp = /\/([0-9]*)\/$/;
        const id = item.url.match(regExp)[1];
        return id;
    }

    transformPlanet = (planet) => {
        return {
            id: this._extraId(planet),
            name: planet.name,
            rotationPeriod: planet.rotation_period,
            population: planet.population,
            diameter: planet.diameter,
        }; 
    }
    transformPerson = (person) => {
        return {
            id: this._extraId(person),
            name: person.name,
            eyeColor: person.eye_color,
            gender: person.gender,
            birthYear: person.birth_year,
        };  
    }

    transformStarship = (starship) => {
        return {
          id: this._extraId(starship),
          name: starship.name,
          model: starship.model,
          manufacturer: starship.manufacturer,
          costInCredits: starship.cost_in_credits,
          length: starship.length,
          crew: starship.crew,
          passengers: starship.passengers,
          cargoCapacity: starship.cargo_capacity
        }
      };
    
      getPersonImage = ({id}) => {
        return `${this._imgBase}/characters/${id}.jpg`
      };

      getStarshipImage = ({id}) => {
        return `${this._imgBase}/starships/${id}.jpg`
      };

      getPlanetImage = ({id}) => {
        return `${this._imgBase}/planets/${id}.jpg`
      };
}


