// Toda la data es un objeto
// - studio::: propiedad de tipo string
// - films: propiedad de tipo Array donde cada item es un objeto en si mismo
// - films[0] objetos de tipo string exceptuando peaople, locations y vehicles"  que son arreglos.
//Objeto Data con un metodo Get
//La ventaja de los objetos es que como tienen identidad, pueden encargarse de mas cosas dentro de el mismo
export function DataManager() {
    //Ready sera true cuando ya tienes la data disponible y data contiene la "data"
    this.data = undefined; //
    this.ready = false;
    const process = () => {
            const { films } = this.data; //destructuro el films para no llamarlo siempre data.films.forEach
            this.films = films;
            this.years = films.map((item) => item.release_date).filter((item) => ![undefined].includes(item));
            this.years = [...new Set(this.years)]; //Un valor en un Set sólo puede estar una vez, el operador de descanso: ... lo que hace es recorrer los elementos de un objeto iterable y devolverlos separados por coma.
            console.log('los años ', this.years);
            this.producer = films.map((item) => item.producer).filter((item) => ![undefined].includes(item));
            this.producer = [...new Set(this.producer)];
            console.log('los productores', this.producer);
            this.title = films.map((item) => item.title);
            console.log('somos los titulos', this.title);
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
    this.filterByProducer = (producer) => { //Metodo filtrar por productor.
            console.log('sirve por fa ', this.films);
            if (!this.films) return []; //no se ha ejecutado el metodo load, no hay films para cargar.
            return this.films.filter((item) => {
                console.log("comparamos", `${item.producer} == ${producer}`)
                return item.producer == producer
            });
        }
        //probando ambas juntas los sort
    this.sortData = (option, field) => {
        let checkIsUp = (a, b) => a > b;
        let types = ['upward', 'falling'];
        if (!types.includes(option)) return new Error('El tipo no existe');
        return this.films.sort((filmA, filmB) => {
            if (filmA[field] === filmB[field]) return 0; //aqui comparo los campos
            console.log('soy campo a=>', filmA[field], 'soy campo b=>', filmB[field], 'soy campo solo=>', field);
            let isUp = checkIsUp(filmA[field], filmB[field]);
            console.log('que imprime isUp', isUp)
            if (option === 'upward') return isUp ? 1 : -1;
            if (option === 'falling') return isUp ? -1 : 1;
        });
    };
}