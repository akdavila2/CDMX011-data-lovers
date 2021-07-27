import { DataManager, } from './data.js';
let manager = new DataManager; /// se instancia todo lo que esta adentro del DataManager, todos los this, aqui podre verlos.
console.log('la clase', manager);
console.log('que trae producer', manager.filterByProducer('Hayao Miyazaki'));
console.log('que trae años', manager.filterByProducer(1988));

const templatePoster = (manager) => {
    return `<picture>
   
    <img src= "${manager.poster}" alt= "${manager.title}" class= "imgfilm" id= "${manager.id}">

    </picture>`;
}
const createOpcion = (value, text) => {
        const option = document.createElement('option');
        option.value = value;
        option.text = text;
        return option;
    }
    //constantes del DOM
const selectProducer = document.querySelector('#selectProducer');
console.log('que me tares selectProducer', selectProducer)
const gridMovies = document.querySelector('#gridMovies');
//const orderDate = document.querySelector('#orderDate');
//const orderFilms = document.querySelector('#orderFilms');
const reset = document.querySelector('#reset')
const start = async() => {
    await manager.load();
    console.log('el manager', manager);
    //Mostrando los poster
    let outputPoster = [];
    const div = document.createElement('div'); //createElement() crea un elemento HTML especificado por su tagName.
    manager.films.forEach((items) => outputPoster += templatePoster(items)); //forEach recorre los elementos del arreglo films.
    div.innerHTML = outputPoster;
    gridMovies.appendChild(div); //el metodo appendChild inserta un nuevo nodo dentro de la estructura DOM.
    //Llenando el select de producer 
    // manager.years.forEach(item => orderDate.add(createOpcion(item, item)));
    manager.producer.forEach(item => selectProducer.add(createOpcion(item, item)));
    selectProducer.addEventListener('change', () => {
        let optionProducer = selectProducer.value;
        let filterProducer = manager.filterByProducer(optionProducer);
        let listByProducer = '';
        filterProducer.forEach((item) => listByProducer += templatePoster(item));
        div.innerHTML = listByProducer;
    })
    const mySelects = (select) => {
        select.addEventListener('change', event => {
            let field = select.dataset.field;
            console.log('soy field', field);
            let option = select.value;
            let data = manager.sortData(option, field);
            console.log('VAriable data', data);
            let listByOrder = '';
            data.forEach((item) => listByOrder += templatePoster(item));
            div.innerHTML = listByOrder;
        })
    }; // esto se ejecuta por cada select.
    let quiensoy = document.querySelectorAll(`[data-field]`).forEach(mySelects);
    console.log('quien soy', quiensoy)

    const restore = () => document.getElementById('myForm').reset; //Restaurando los valores con el metodo HTMLFormElement.reset

    //Pagina de mas informacion

}
start();