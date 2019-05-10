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
const dbName = 'tienda';
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


//4. Ruta de la tienda
app.get('/tienda', function(req, res) {
    path.join(__dirname, '/views');
    //8. buscar documentos mongo
    var productos = clientdb.collection('Productos');
    productos.find()
             .toArray(function(err, docs) {
        var contexto = {
            listaProductos: docs,
        };

        res.render('tienda',contexto);

        console.log('Encontramos los documentos');
    console.log(docs.length);
    });
 
 });

 //Ruta filtros
app.get('/tienda/:categoria', function(req, res) {

    var productos = clientdb.collection('Productos');
    productos.find({ categoria: req.params.categoria })
             .toArray(function(err, docs) {
        var contexto = {
            listaProductos: docs,
          
        };
        res.render('tienda',contexto);
    });
});


//6. Ruta dinamica del producto
app.get('/tienda/productos/:detalles',function(req,res){

  
    var contexto=null;
    

    var productos = clientdb.collection('Productos');
    productos.find({}).toArray(function(err,docs){
        assert.equal(null,err);
     
        docs.forEach(function(prod){
            if(prod.ref == req.params.detalles){
                contexto=prod;
            }
        });
 

    if(contexto == null){
        res.send('Page not found');
    }else{
        res.render('detalles',contexto);
    }

   

});

});

//3. Decirle por que puerto ecuchar  
app.listen(3000, function(){
console.log('Holi servidor');
});