const axios = require("axios");

class Busquedas {
  historial = ["Pereira", "Madrid", "Barcelona", "Bogota", "Londres"];

  constructor() {
    //TODO leer DB si existe
  }

  get paramsMapBox(){
    return{
      'language': 'es',
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
    }
  }

  get paramsWeather(){
    return{
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es'
    }
  }

  async ciudad(ciudad) {
    try {
      //Petición HTTP
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
        params: this.paramsMapBox
      });

      const resp = await instance.get();
      return resp.data.features.map( lugar=>({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1]
        
      }));

    } catch (error) {
      return [];
    }
  }
  

  async climaLugar(lat, lon){
    try{
      //Petición HTTP
      const instanceClima = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          ...this.paramsWeather, lat, lon
        }
      });

      const res = await instanceClima.get();
      const { weather, main } = res.data;

      const weatherData = {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }

      return weatherData;
    }
    catch(error){
      console.log(error);
    }
  }
}

module.exports = Busquedas;
