/*
var parrafos = document.querySelectorAll('p');

function cambiarTexto(parrafo){
parrafo.style.color='blue';
}

parrafos.forEach(cambiarTexto);

function cambiar(p) {
    var random = Math.round(Math.random() * 2);
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var p = parrafos[random]; 
    console.log(random);
    p.style.backgroundColor ="rgb(" + r + "," + g + "," + b + ")";
  //  pp.style.background='white';

}

setInterval(cambiar, 500);

*/

var express = require('express');
var exphbs = require('express-handlebars');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var db = null;

const url = 'mongodb://localhost:27017';
const dbName = 'tienda';

const client = new MongoClient(url);
client.connect(function (err) {
  assert.equal(null, err);

  console.log('Conectados a base de datos');
  db = client.db(dbName);






  app.get('/tienda', function(req, res) {
    
    const productos = db.collection('productos');
  productos.find({}).toArray(function (err, docs) { /* Para organizar poner al lado del {} del find sort['Precio']*/
    assert.equal(null, err);

    var contexto = {
      productos: docs /*Crear bariable "{{#each productos"}} Cada cosito con "this.titulo" - this.imagen 
      {{/each}} */ 
    };
    res.render('carrito',contexto);
    
    console.log('Encontramos los documentos');
    console.log(docs.length);
  });
    
  });


 // client.close();

});







var app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



function cargarPagina() {

  var hamburguesa = document.querySelector('.hamburguesa');
  var activo = false;

  function menuHamburguesa() {
    var opciones = document.querySelector('.barra__ul');
    var barra = document.querySelector('.barra');
    var click = false;
    if (activo === false) {
      opciones.style.display = 'block';
      opciones.style.widht = '100%';
      barra.style.display = 'block';
      barra.style.height = 'auto';
      opciones.style.transition = '0..5s';
      barra.style.transition = 'display 0.5s';
      console.log("opciones");
      activo = true;
      click = true;
    } else if (activo === true || click === false) {
      opciones.style.display = 'none';
      opciones.style.widht = '50%';
      barra.style.display = 'flex';
      barra.style.height = '60px';
      activo = false;
    }

  }

  hamburguesa.addEventListener('click', menuHamburguesa);


  var imgsGaleria = document.querySelectorAll('.cuarto__img');
  var imgGrande = document.querySelector('.cuarto__video');

  function recorrerImgsGalería(img, index) {

    function clickGaleria(event) {


      var url = img.style.backgroundImage;

      imgGrande.style.backgroundImage = url;
      imgGrande.style.height = '500px';
      imgGrande.style.transition = "height 0.5s";
      imgGrande.style.transition = "0.5s";



      console.log("clickFunciona", url + 'calex');
    }


    img.addEventListener('click', clickGaleria);
  }

  imgsGaleria.forEach(recorrerImgsGalería);



  var colores = document.querySelectorAll('.quinto__color-col');
  var beatColor = document.querySelector('.quinto__img');

  function recorrerColores(col, index) {

    function clickColor(event) {

      var url = col.style.backgroundImage;
      var urlD = url.split('/');
      var urlPunto = urlD[urlD.length - 1].split('.');

      beatColor.style.backgroundImage = "url(/Imagenes/" + urlPunto[urlPunto.length - 2] + 'b' + '.png)';
      beatColor.style.transition = "0.5s";
      console.log("clickSobreElColor", urlD[urlD.length - 1], "------------", urlPunto[urlPunto.length - 2]);
    }


    col.addEventListener('click', clickColor);
  }

  colores.forEach(recorrerColores);


  ScrollReveal().reveal('.primero__img', { delay: 300 });
  ScrollReveal().reveal('.primero__info');


  var slideUp = {
    distance: '10%',
    origin: 'bottom',
    opacity: null,
    reset: true,
    useDelay: 'always',
    duration: 1000,
  };

  ScrollReveal().reveal('.quinto__img', slideUp);

  var slideDown = {
    distance: '50%',
    origin: 'top',
    opacity: null,
    reset: true,
    useDelay: 'always',
    duration: 1000,
  };

  ScrollReveal().reveal('.quinto__color', slideDown);
  ScrollReveal().reveal('.quinto__titulo', slideDown);



}

window.addEventListener('load', cargarPagina);


app.get('/tienda/', function(req,res){
  
    var productos = clientdb.collection('productos');
    productos.find().toArray(function(err,docs){
      var contexto ={
        listaProductos: docs,
      };

      res.render('render',contexto);
    });
});
