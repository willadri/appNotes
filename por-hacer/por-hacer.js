const fs = require('fs');

let listadoPorHacer = [];


//guaradar datos en la base de datos
const guardarDb = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo guardar la informacion', err);
    });
}

//cargar base de datos
const cargarDb = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

//crea el archivo de datos
const crear = (descripcion) => {
    cargarDb();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;
}

//retorna la lista de tareas de la base de datos 
const getListado = () => {
    cargarDb();
    return listadoPorHacer;
}

//actualiza la tarea
const actualizar = (descripcion, completado = true) => {
    cargarDb();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    } else {
        return false;
    }

}

//borra una tarea
const borrar = (descripcion) => {
    cargarDb();
    let nuevoListado = listadoPorHacer.filter(e => e.descripcion !== descripcion);
    if (nuevoListado.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDb();
        return true;
    }


}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}