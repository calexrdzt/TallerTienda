//1. Importar librerias
var express = require('express');
var exphbs = require('express-handlebars'); 


//1. Crear app de express
var app = express();

//1. Establecer la carpeta public como estatica
app.use(express.static('public'));

//1. Registro de handlebars
app.engine('handlebars',exphbs());

//1.Establecer handlebars como el motor de render
app.set('view engine','handlebars');


//7. conectar base de datos de mongo


//Mongo: crear variables (Paso 1)
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'Tienda';
const client = new MongoClient(url, { useNewUrlParser: true });
var clientdb=null;

//Mongo: conectar (Paso 2)
client.connect(function(err) {
   assert.equal(null, err);
   console.log("Conectado a la base de datos");
   clientdb = client.db(dbName);
  // client.close();
 });

// 2. Crear la ruta inicial (Home, Taller 1)
app.get('/',function(req,res){
res.sendFile(__dirname+'/public/Taller1RodriguezChristian.html');
});

 //Ruta filtros
app.get('/tienda/:tipo?', function(req, res) {

    var query = {};
    if(req.params.tipo){
        query.tipo = req.params.tipo;
    }
    var productos = clientdb.collection('Productos');
    productos.find(query)
             .toArray(function(err, docs) {
        var contexto = {
            listaProductos: docs,
        };
        res.render('tienda',contexto);
        console.log(docs.length);
    });
});



//6. Ruta dinamica del producto
app.get('/tienda/Productos/:producto',function(req,res){

    var contexto=null;
    console.log('Se encontro producto');

    var productos = clientdb.collection('Productos');

    productos.find({id : req.params.producto}).toArray(function(err,docs){
        assert.equal(null,err);
             
        docs.forEach(function(prod){

                contexto=prod;
                console.log(contexto.nombre+ "holi babys");

        });
 
    if(contexto == null){
        res.send('Page not found');
    }else{
        res.render('producto', contexto);
    }

    });
});


app.get('/tienda/:filtro', function(req, res) {

    var productos = clientdb.collection('Productos');
    productos.find({ $or: [ { cone: req.params.filtro }, { tipo: req.params.filtro }]})
	        .toArray(function(err, docs) {
        var contexto = {
            listaProductos: docs,
        };
        res.render('tienda',contexto);
    });

    
   
});



//Ruta al resumen
app.get('/resumen', function(req, res) {
    var contexto = {
       
    };
    res.render('resumen',contexto);
});

//Ruta al checkout
app.get('/checkout', function(req, res) {
    var contexto = {
       
    };
    res.render('checkout',contexto);
});


//Ruta al checkout
app.post('/resumen', function(req, res) {
    
    var pedido = {
       nombre:req.body.nombre,
       nombreT:req.body.nombreT,
       apellido:req.body.apellido,
       direccion:req.body.direccion,
       cooreo:req.body.correo,
       mes:req.body.mes,
       an:req.body.an,
       numero:req.body.numero,
       contra:req.body.contra,
       productos:JSON.parse(req.body.productos)
    };

    var collection=clientdb.collection('pedidos');
    collection.insertOne(pedido,function(err){
        assert.equal(err,null);
        console.log("Pedido Guardado");

    });
    res.redirect('/tienda');
});

/*

const fs = require('fs');

var collection = db.collection('productos');
collection.find({})
.toArray(function(err,docs){
    fs.writeFileSync('db.json', JSON.stringify)
})
*/

//3. Decirle por que puerto ecuchar  
app.listen(3000, function(){
console.log('Holi servidor');
});