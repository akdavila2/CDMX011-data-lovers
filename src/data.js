// Toda la data es un objeto
// - studio::: propiedad de tipo string
// - films: propiedad de tipo Array donde cada item es un objeto en si mismo
// - films[0] objetos de tipo string exceptuando peaople, locations y vehicles"  que son arreglos.

//Objeto Data con un metodo Get
//La ventaja de los objetos es que como tienen identidad, pueden encargarse de mas cosas dentro de el mismo

export function DataManager() {
    //Ready sera true cuando ya tienes la data disponible y data contiene tiene la "data"
    this.data = undefined; //
    this.ready = false;
    const process = () => {
            //destructuro el films para no llamarlo siempre data.films.forEach
            const { films } = this.data;
            this.films = films;
            this.years = films.map((item) => item.release_date).filter((item) => ![undefined].includes(item));
            this.years = [...new Set(this.years)]; //Un valor en un Set sólo puede estar una vez, el operador de descanso: ... lo que hace es recorrer los elementos de un objeto iterable y devolverlos separados por coma.
            console.log('los años ', this.years);
            this.producer = films.map((item) => item.producer).filter((item) => ![undefined].includes(item));
            this.producer = [...new Set(this.producer)];
            console.log('los productores', this.producer);
        }
        //Metodo para cargar la data.
    this.load = async() => { //funcion es asincrona
            const response = await fetch('/data/ghibli/ghibli.json'); //El método fetch() es una peticion get o post a una url en nuestro caso es local.
            this.data = await response.json(); // respuesta de la funcion asincrona, por medio de la palabra await
            console.log("data obtenida", this.data);
            this.ready = true;
            process();
            return this.ready;
        }
        //Metodo filtrar por productor.
    this.filterByProducer = (producer) => {
            console.log('sirve por fa ', this.films);
            if (!this.films) return []; //no se ha ejecutado el metodo load, no hay films para cargar.
            return this.films.filter((item) => {
                console.log("comparamos", `${item.producer} == ${producer}`)
                return item.producer == producer
            });
        }
        //metodo para ordenar con sort
    this.sortData = (option) => {
        let checkIsUp = (a, b) => a > b;
        let types = ['upward', 'falling'];
        if (!types.includes(option)) return new Error('El tipo no existe');

        return this.films.sort((filmA, filmB) => {
            // comparamos los anios de las peliculas, no las peliculas
            if (filmA.release_date === filmB.release_date) return 0;
            //  checkIsUp  compara anios, asi que tenemos es que pasar los anios.

            let isUp = checkIsUp(filmA.release_date, filmB.release_date);
            if (option === 'upward') return isUp ? 1 : -1; //operadores ternarios el ?  equivale al if y los : al else 
            if (option === 'falling') return isUp ? -1 : 1;
        });
    };
    this.sortDataFilms = (option) => {
        let checkIsUp = (a, b) => a > b;
        let types = ['upward', 'falling'];
        if (!types.includes(option)) return new Error('El tipo no existe');
        return this.films.sort((filmA, filmB) => {
            // comparamos los anios de las peliculas, no las peliculas
            if (filmA.title === filmB.title) return 0;
            /**
             * La funcion checkIsUp  comparando anios, asi que tenemos es que pasar los anios.
             */
            let isUp = checkIsUp(filmA.title, filmB.title);
            if (option === 'upward') return isUp ? 1 : -1; //operadores ternarios 
            if (option === 'falling') return isUp ? -1 : 1;
        });
    };

}