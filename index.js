//1. Importar librerias
var express = require('express');
var exphbs = require('express-handlebars'); 


//1. Crear app de express
var app = express();

//1. Establecer la carpeta public como estatica
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//1. Registro de handlebars
app.engine('handlebars',exphbs());

//1.Establecer handlebars como el motor de render
app.set('view engine','handlebars');


app.engine('handlebars', exphbs({
    defaultLayout:false,
}));


//7. conectar base de datos de mongo


//Mongo: crear variables (Paso 1)
var MongoClient = require('mongodb').MongoClient;  

MongoClient.connect('mongodb+srv://@cluster0-iojdx.mongodb.net/tienda',
    {
        auth: {
        user: 'calexrdzt',
        password: 'vce0evgvxr0.'
        }
    },

    function (err, client) {
    if (err) throw err;

    db = client.db('tienda');

    // Iniciar servidor
    app.listen(process.env.PORT || 1234);
});


var assert = require('assert');
var clientdb=null;


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
   // var productos = clientdb.collection('productos');
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

    var productos = clientdb.collection('productos');

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


//Ruta al experiencia
app.get('/experiencia', function(req, res) {
    var contexto = {
       
    };
    res.render('experiencia',contexto);
});

//Ruta al tienda
app.get('/tienda', function(req, res) {
    var productos = db.collection('Productos');    
    var contexto = {
               listaProductos: productos,
    };
    res.render('tienda',contexto);
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
app.post('/acabamos', function(req, res) {
    
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
      // productos:JSON.parse(req.body.productos)
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
