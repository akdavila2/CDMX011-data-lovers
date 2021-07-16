// import data from "./data/ghibli/ghibli.js";
// console.log(data)

// // function ghibliAll() {
// //     getGhibliData((data)=>{
// //         showGhibliList(data.ghibli);
// //     });
// // }
import {datas, filter} from './data.js'


       
document.addEventListener('DOMContentLoaded', getData ); 
    function getData(){
        fetch(datas)//recuperar el archivo json
        .then(function(res){ //devuelve un objeto, empezamos una funcion para indicar el formato en que se desea obtener la informacion
            
            return res.json(); //accedemos a los valores y lo volvemos json
           
        })
        .then(function(data){//para jalar la data
            let html = '';
            let titles = '';
            data.films.forEach(element => { //Ejecuta la función indicada una vez por cada elemento del array
                html += `<option> ${element.release_date}</option>
                         `;                
            });
            document.getElementById("btnYear").innerHTML = html;

            data.films.forEach(element =>{
            titles += `<div class= "containerposter" ><h3 class= "namestitle"> ${element.title}</h3>
                            <img src= "${element.poster}"  aling-contain="center" >
                        </div>`;
                   
            });
            document.getElementById("container").innerHTML = titles;
            



        });
    };



    // function createNode(element){ //insertar imagenes 
    //     return document.createElement(element);
    // }
    // function append(parent,el){
    //     return parent.appendChild(el);
    // }
    // const ul = document.getElementById('root');
    // const datas= './data/ghibli/ghibli.json';
    //     fetch(datas)
    //         .then((resp) => resp.json())
            
    //         .then(function(data){
    //             let films = data.films.results;
    //                return films.map(function(film) {
    //                 let titles = createNode('tit');
    //                 let img = createNode('img');
    //                 let span = createNode('span');
    //                 img.src = data.films.poster;
    //                 span.innerHTML=`${films.title}${films.poster}`;
                    
    //                 append(titles,img);
    //             })
    //         })
    //         .catch(function(error){
    //             console.log(error);
    //         });
   
    // const GhibliBox= document.getElementById("tarjetapeliculas");

//          fetch(datas)
//         .then(function(res){
//             return res.json();
            
            
//         })
//         .then(function(data){//para jalar la data
//         let html = '';
//             data.films.forEach(films => { //Ejecuta la función indicada una vez por cada elemento del array
//                 html += `<div class="film-box">
//             <div class="carta">
//             <h2  class= "titulofilms"
//             Nombre: ${films.title}
//             </h2>
//             <img src= "${films.poster}">
//             </div>
//             </div>`;                
//             });
//             html += '';
//             document.getElementById("tarjetapeliculas") = html;
//             });
//             GhibliBox(datas,)