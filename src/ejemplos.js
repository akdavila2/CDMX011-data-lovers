// forma uno
document.querySelectorAll(`[data-field]`).forEach((select) => {
        select.addEventListener('change', event => console.log(event)); // esto se ejecuta por cada select.
    }) // esto se ejecuta por cada select.

});
// forma dos
const fun = (select) => {
    select.addEventListener('change', event => console.log(event)); // esto se ejecuta por cada select.
};
document.querySelectorAll(`[data-field]`).forEach(fun);

//forma tres
function fun(select) {
    select.addEventListener('change', event => console.log(event)); // esto se ejecuta por cada select.
}
document.querySelectorAll(`[data-field]`).forEach(fun);



const prueba = (select) => {
    console.log(select);
}
document.querySelectorAll(`[data-field]`).forEach((prueba) => console.log(select));

document.querySelectorAll(`[data-field]`).forEach((select) => select.addEventListener('change', event => console.log(select)));