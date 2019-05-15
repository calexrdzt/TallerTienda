var productos = [];

if (localStorage.getItem('productos')) {
    productos = JSON.parse(localStorage.getItem('productos'));
}

var botonAgregar = document.querySelector('.producto__agregar');

if (botonAgregar) {
    botonAgregar.addEventListener('click', agregarProducto);
}

function agregarProducto() {

    var nombreProducto = document.querySelector('.producto__titulo').innerHTML;
    var imagenProducto = document.querySelector('.producto__imagen-res').style.backgroundImage;
    var precioProducto = document.querySelector('.precioReal').innerHTML;

    var producto = {
        nombre: nombreProducto,
        imagen: imagenProducto,
        precio: precioProducto
    }

    productos.push(producto);

    localStorage.setItem('productos', JSON.stringify(productos));
    console.log(productos);

}


function actualizarCarrito() {

    var contendorResumen = document.querySelector('.prods__informacion');

    if (contendorResumen) {

        productos.forEach(prod => {
        contendorResumen.innerHTML += ` <div class="prods__producto">
        <div class="prods__producto-img"style="background-image:`+ prod.imagen + `;" onclick="location.href='/tienda/bluetooth';">
        </div>
        
        <div class="prods__producto-info">
            <h1 class="prods__nombre">`+ prod.nombre + `</h1>
            <p class="prods__texto">TExto del producto</p>
        </div>

        <div class="prods__producto-precio">
            <p class="prods__texto">$`+ prod.precio + `</p>
            <button class="eliminar">Eliminar</button>
        </div>
    </div>`;
        });
    }
}


actualizarCarrito();