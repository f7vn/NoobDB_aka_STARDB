
export default class SwapiService {

    _apiBase = 'https://swapi.co/api'

    async getResource (url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok)
            throw new Error(`Could not fetch ${url}, recived ${res.status}`);
        
        return await res.json();
    };    

    async getAllPeople() {
        const res = await this.getResource('/people/')
        return res.results;
    }

    async getPerson(id) {
        return this.getResource(`/people/${id}`)
    };

    async getAllStarships() {
        const res = await this.getResource('/starships/')
        return res.results;
    }

    async getStarship(id) {
        return this.getResource(`/starships/${id}`)
    };

    async getAllPlanets() {
        const res = await this.getResource('/planets/')
        return res.results.map(this.transformPlanet);
    }

    async getPlanet(id) {
        const planet = await this.getResource(`/planets/${id}`);
        return this.transformPlanet(planet);
    };

    _extraId(item) {
        const regExp = /\/([0-9]*)\/$/;
        const id = item.url.match(regExp)[1];
        return id;
    }

    async transformPlanet(planet){
        
        return {
            id: this._extraId(planet),
            name: planet.name,
            rotationPeriod: planet.rotation_period,
            population: planet.population,
            diameter: planet.diameter,
        }; 
    }
}
