const inquirer = require('inquirer');
require('colors');

const preguntas = [
	{
		type: 'list',
		name: 'opcion',
		message: '¿Que desea hacer',
		choices: [
			{
				value: 1,
				name: `${'1.'.blue} Buscar ciudad`
			},
			{
				value: 2,
				name: `${'2.'.blue} Historial`
			},
			{
				value: 0,
				name: `${'0.'.blue} Salir`
			}
		]
	}
]


const inquirerMenu = async() => {
	console.clear();
	console.log('========================'.green);
	console.log('Seleccione una opcion'.green);
	console.log('========================\n'.green);

	const { opcion } = await inquirer.prompt(preguntas);
	return opcion;

}

const pausa = async() => {
	const question = [
		{
			type: 'input',
			name: 'enter',
			message: `\nPresione ${'ENTER'.green} para continuar\n`
		}
	]
	await inquirer.prompt(question);
}

const leerInput = async(message) => {

	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value){
				if(value.length === 0){
					return 'Ingrese una ciudad';
				}
				return true;
			}
		}
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
}

const listados = async(items) => {
	const choices = items.map((item, index)=>{

		const idx = `${index + 1}.`.green;

		return{
			value: item.id,
			name: `${idx} ${item.nombre}`
		}
	})

	choices.unshift({
		value: '0',
		name: '0'.green + 'Cancelar'
	});

	const opciones = [
		{
			type: 'list',
			name: 'id',
			message: 'Seleccione: ',
			choices
		}
	]
	const { id } = await inquirer.prompt(opciones);
	return id;

}


const confirmar = async(msg) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message: msg
		}
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
}

const completarTareasList = async(tareas) => {
	const choices = tareas.map((tarea, index)=>{

		const idx = `${index + 1}.`.green;

		return{
			value: tarea.id,
			name: `${idx} ${tarea.desc}`,
			checked: (tarea.completadoEn) ? true : false
		}
	})


	const preguntas = [
		{
			type: 'checkbox',
			name: 'ids',
			message: 'Seleccione',
			choices
		}
	]
	const { ids } = await inquirer.prompt(preguntas);
	return ids;

}

module.exports = {
    inquirerMenu,
		pausa,
		leerInput,
		listados,
		confirmar,
		completarTareasList
}
