const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de una tarea por hacer'
};
const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completadp o pendiente la tarea'
};
const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', descripcion)
    .command('actualizar', 'Actualiza el estado completado de una tarea', { descripcion, completado })
    .command('borrar', 'Borra la tarea seleccionada', descripcion)
    .help()
    .argv;

module.exports = {
    argv
}