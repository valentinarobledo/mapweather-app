require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listados } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() =>{

	console.clear();

	let opt = '';
	const busquedas = new Busquedas();

	do{

		opt = await inquirerMenu();

		switch (opt) {
			case 1:
				//Mostrar mensaje
				const lugar = await leerInput('Ciudad: ');

				//Buscar los resultados
				const lugares = await busquedas.ciudad(lugar);

				//Seleccionar el lugar
				const idSel = await listados(lugares);

				console.log({ idSel });
				const lugarSel = lugares.find( item => item.id === idSel);
				console.log(lugarSel);
				//Datos del clima relacionados

				//Mostrar resultados
				console.log('\nInformación de búsqueda\n'.green);
				console.log('Ciudad:', lugarSel.nombre );
				console.log('Lat: ', lugarSel.lat);
				console.log('Lng: ', lugarSel.lng);
				console.log('Temperatura: ',);
				console.log('Minima:' ,);
				console.log('Maxima: ',);

				break;
		}
		
		if (opt !== 0) await pausa();

	} while(opt !== 0);
}

main();