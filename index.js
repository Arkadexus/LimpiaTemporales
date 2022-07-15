const fs = require('fs');
const colors = require('colors');
const { pausa } = require(`./pregunta.js`);

const limpiarTemporales = (origen) => {
    const files = fs.readdirSync(origen);
    files.forEach((file) => {
        const ruta = `${origen}\\${file}`;
        const stat = fs.lstatSync(ruta);
        if(stat.isFile()){
            try{
                fs.unlinkSync(ruta);
            }catch(e){
                console.error(`El archivo ${file.green} no se ha podido eliminar por estar en uso.`);
            }
        }else if(stat.isDirectory()){
            try{
                fs.rmSync(ruta, {recursive: true, force: true});
            }catch(_){
                console.error(`El directorio ${file.green} no se ha podido eliminar.`);
            }
        }
    });
}

const main = async () => {
    const usuarios = fs.readdirSync("C:\\Users");
    usuarios.forEach((file) => {
        const user = fs.lstatSync(`C:\\Users\\${file}`);
        if(user.isDirectory()){
            try{
                limpiarTemporales(`C:\\Users\\${file}\\AppData\\Local\\Temp`);
                console.log(`\nSe han limpiado los archivos temporales de ${file.green}\n`);
            }catch(_){
                console.log(`\nEl usuario ${file.green} no tiene carpeta de archivos temporales\n`);
            }
        }
    });

    try{
        limpiarTemporales(`C:\\Windows\\Temp`);
        console.log(`\nSe han limpiado los archivos temporales de ${"Windows".green}\n`);
    }catch(e){
        console.log(`\nHa habido un error limpiando los archivos temporales de ${"Windows".green}\n`);
        console.log(e);
    }
    
    await pausa();
}

main();