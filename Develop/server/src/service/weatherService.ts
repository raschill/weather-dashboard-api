import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  long: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  temp: string;
  windSpd: string;
  humidity: string;
  icon: string;
  desc: string; 

constructor(city: string, date: string, temp: string, windSpd: string,
  humidity: string, icon: string, desc: string){
    this.city= city;
    this.date= date;
    this.temp= temp;
    this.windSpd= windSpd;
    this.humidity= humidity;
    this.icon= humidity;
    this.desc= desc;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  cityName: string;
  APIKey: string | undefined;
  baseURL: string;

  constructor(cityName: string){
    this.cityName= cityName;
    this.APIKey= process.env.API_KEY;
    this.baseURL= process.env.API_Base_URL || `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string){
    try{
      const response= await fetch(query);
      const parsedResponse= await response.json();
    }
    catch (error){
      console.error(error);
      throw error;
    }
  }
 
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {

     if (!locationData){
      console.log(`Location not found.`);
      }  

    const { lat, long } = locationData;
    return {lat, long};
  
    const coordinates: Coordinates= {
      lat,
      long
    };
    return coordinates;
   
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    const geoCodeQuery= '${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}';
    return geoCodeQuery;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery= `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    return weatherQuery;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((data) =>
    this.destructureLocationData(data));
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const queryString= this.buildWeatherQuery(coordinates);
    const response= await fetch(queryString);
    const forecast: WeatherData = await response.json();
    return forecast;

  }
  
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {

    const currentWeather= new Weather(
      this.cityName,
      response.dt_txt.split(" ")[0],
      response.main.temp,
      response.wind.speed,
      response.main.humidity,
      response.weather[0].icon,
      response.weather[0].desc || response.weather[0].main
    );
    return currentWeather;
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const newForecast: Weather[] = [currentWeather];
    const filterWeatherData= weatherData.filter((data:any) => {
      return data;
    });

    for (const data of filterWeatherData){
      newForecast.push(
        new Weather(
          this.cityName,
          data.dt_txt.split(" ")[0],
          data.main.temp,
          data.wind.speed,
          data.main.humidity,
          data.weather[0].icon,
          data.weather[0].desc || data.weather[0].main
        )
      );
    }
    return newForecast;
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
    this.cityName= city;
    const coordinates= await this.fetchAndDestructureLocationData();
    if (coordinates){
      const weather= await this.fetchWeatherData(coordinates);
      return weather;
    }
    }
    catch (error){
      console.error(error);
      return error;
    }
  }
}

export default new WeatherService('New York City');
