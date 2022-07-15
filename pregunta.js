const inquirer = require('inquirer');
const colors = require('colors');

const pausar = [
    {
        type: 'input',
        name: 'enter',
        message: `Se han eliminado todos los archivos y directorios temporales sin usar. Presiona ${`enter`.green} para cerrar.`,
    }
]

const pausa = async() => {
    await inquirer.prompt(pausar);
}

module.exports = {
    pausa
}