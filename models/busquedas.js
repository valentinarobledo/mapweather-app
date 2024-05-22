const fs = require('fs');
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath='./db/database.json';

  constructor() {
    //TODO leer DB si existe
    this.leerDB();
  }

  get historialCapitalizado(){
    return this.historial.map(lugar =>{
      let palabras = lugar.split(' ');
      palabras = palabras.map(p => p[0].toUpperCase()+ p.substring(1));

      return palabras.join(' ');
    })  
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

  agregarHistorial(lugar){
    //TODO: Prevenir diplicados
    if(this.historial.includes(lugar.toLocaleLowerCase())){
      return;
    }
    this.historial = this.historial.splice(0, 9);

    this.historial.unshift(lugar.toLocaleLowerCase());

    //Grabar en DB
    this.guardarDB();

  }

  guardarDB(){

    const payload = {
      historial: this.historial
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB(){
    //Verificar que exista
    if(!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    //Cargar la información 
    this.historial = data.historial;


    
  }
}

module.exports = Busquedas;
