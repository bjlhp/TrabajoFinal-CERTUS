/* Variables global */
let arrayCatalogo = new Array();
let numPage;

/* Leer parametros URL */
let parametrosURL = new URLSearchParams(location.search);

/* Comprobar pagina */
if (parseInt(parametrosURL.get("page")) == 1 || parametrosURL.get("page") == null) {
    numPage = 1;
} else {
    numPage = parseInt(parametrosURL.get("page"));
}

/* Solicitar datos al servidor */
fetch("productos.json").then(respuesta => respuesta.json()).then(objeto => {
    arrayCatalogo = objeto;
    cargarCatalogo(numPage);
})

/* Definir cargar catalogo */
function cargarCatalogo(pagina) {
    /* Referencia de catalogo */
    let filaCatalogo = document.querySelector("#catalogo");

    /* Crear elementos */
    let inicio = (pagina - 1) * 8;
    let final;
    let tmpfinal = pagina * 8 - 1;
    if (arrayCatalogo.length < tmpfinal) {
        final = arrayCatalogo.length;
    } else {
        final = tmpfinal;
    }
    for (let index = inicio; index <= final; index++) {
        /* Procesos valor productos */
        let nombre = arrayCatalogo[index].name;
        let nomImage = arrayCatalogo[index].image;
        /* Procesos precios */
        let precio = arrayCatalogo[index].price;
        let oferta = arrayCatalogo[index].offer * 100;
        let precioFinal = precio - (precio * oferta / 100);
        /* Creo articulos */
        let nuevoElemento = document.createElement("article");
        nuevoElemento.setAttribute("class", 'class="col-xs-12 col-sm-6 col-md-4 col-xl-3"')
        nuevoElemento.innerHTML = `
        <picture>
            <img class="img-fluid" src="image/productos/${nomImage}" alt="${nombre}"></img>
        </picture>

        <h4>${nombre}</h4>
        <p>
            <span class="precioOriginal">S/ ${precio}</span>
            <span class="precioDescuento">-${oferta}%</span>
            <br><span class="precioFinal">S/ ${precioFinal}</span>
        </p>
        <button onclick="addCarrito(event)" class="btn btn-light"><i class="bi bi-plus-square"></i> Agregar al carrito</button>
        `;
        /* Añadir el nuevo elemento al catalogo */
        filaCatalogo.append(nuevoElemento);
    }
}

function addCarrito(event) {
    const button = event.target;
    const article = button.closest('article');
    const nombre = article.querySelector('h4').innerText;
    const precio = article.querySelector('.precioFinal').innerText;
    const imagenSrc = article.querySelector('img').getAttribute('src');

    const nuevoElemento = document.createElement('div');
    nuevoElemento.innerHTML = `
      <p>${nombre}</p>
      <img src="${imagenSrc}" alt="${nombre}">
      <p>${precio}</p>
    `;

    const carritoProductos = document.getElementById('carritoProductos');
    carritoProductos.appendChild(nuevoElemento);

    const ventanaCarrito = new bootstrap.Modal(document.getElementById('ventanaCarrito'));
    ventanaCarrito.show();
  }