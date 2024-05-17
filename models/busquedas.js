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
}

module.exports = Busquedas;
