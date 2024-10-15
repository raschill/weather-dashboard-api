import fs from 'fs';
import {v4 as uuidv4} from uuidv4;

// TODO: Define a City class with name and id properties
class City {
  public name: string;
  public id: string;
  
  constructor(name: string) {
    this.name= name;
    this.id= uuidv4();
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return await fs.readFile('db/db.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('db/db.json',
       JSON.stringify(cities, null, '\t'));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    return this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    if (!city) {
      console.log('City required.')
    }
    const cities= await this.read();
    const newCity= new City(city);

    cities.push(newCity);
    await this.write(cities);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {
    let cities= await this.read();
    cities= cities.filter((city: City) => 
    city.id !== id);
    await this.write(cities);
  }
}

export default new HistoryService();
