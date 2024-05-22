require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listados,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  console.clear();

  let opt = "";
  const busquedas = new Busquedas();

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const lugar = await leerInput("Ciudad: ");

        //Buscar los resultados
        const lugares = await busquedas.ciudad(lugar);

        //Seleccionar el lugar
        const idSel = await listados(lugares);
				if(idSel === '0') continue;

        const lugarSel = lugares.find((item) => item.id === idSel);
				//Guardar en DB
				busquedas.agregarHistorial(lugarSel.nombre);
				//Clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        //Mostrar resultados
				console.clear();
        console.log("\nInformación de búsqueda\n".green);
        console.log("Ciudad:", lugarSel.nombre);
        console.log("Lat: ", lugarSel.lat);
        console.log("Lng: ", lugarSel.lng);
        console.log("Temperatura: ", clima.temp);
        console.log("Minima:", clima.min);
        console.log("Maxima: ", clima.max);
        console.log("Descripcion :", clima.desc);

        break;
			case 2: 
				busquedas.historialCapitalizado.forEach((lugar, i) =>{
					const idx = `${ i + 1}.`.green;
					console.log(`${idx} ${lugar}`)
				})

			break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
