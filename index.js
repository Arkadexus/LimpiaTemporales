const fs = require('fs');
const colors = require('colors');
const { pausa } = require(`./pregunta.js`);

// Función que deja vacía la carpeta que se indique en origen, borrando todos sus subdirectorios de forma recursiva y los archivos.
const limpiarTemporales = (origen) => {
    const files = fs.readdirSync(origen); // Lee el directorio de origen para obtener un listado de archivos y directorios
    files.forEach((file) => {
        const ruta = `${origen}\\${file}`; // crea una ruta para cada archivo
        const stat = fs.lstatSync(ruta); // obtiene el archivo o directorio especificado
        if(stat.isFile()){ //Si es un archivo intentará borrarlo o de lo contrario nos avisará con un error
            try{
                fs.unlinkSync(ruta);
            }catch(e){
                console.error(`El archivo ${file.green} no se ha podido eliminar por estar en uso.`);
            }
        }else if(stat.isDirectory()){ // Si es un directorio intentará borrar recursivamente o nos avisará con un error
            try{
                fs.rmSync(ruta, {recursive: true, force: true});
            }catch(_){
                console.error(`El directorio ${file.green} no se ha podido eliminar.`);
            }
        }
    });
}

const main = async () => { //Función principal donde se ejecuta el programa
    const usuarios = fs.readdirSync("C:\\Users"); //Obtiene el directorio de usuarios
    usuarios.forEach((file) => {
        const user = fs.lstatSync(`C:\\Users\\${file}`);
        if(user.isDirectory()){ //Detecta cuales son directorios y limpia los temporales de cada uno
            try{
                limpiarTemporales(`C:\\Users\\${file}\\AppData\\Local\\Temp`);
                console.log(`\nSe han limpiado los archivos temporales de ${file.green}\n`);
            }catch(_){
                console.log(`\nEl usuario ${file.green} no tiene carpeta de archivos temporales\n`);
            }
        }
    });

    try{ //Intenta limpiar los temporales de Windows
        limpiarTemporales(`C:\\Windows\\Temp`);
        console.log(`\nSe han limpiado los archivos temporales de ${"Windows".green}\n`);
    }catch(e){
        console.log(`\nHa habido un error limpiando los archivos temporales de ${"Windows".green}\n`);
        console.log(e);
    }
    
    await pausa();
}

main();