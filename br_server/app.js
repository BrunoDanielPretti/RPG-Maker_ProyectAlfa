const fs = require('fs');
const express = require("express");
const cors = require('cors');

const BD = require('./clases/BD_Manager.js');

//#region Configuracion
const app = express();

//app.use(express.bodyParser());
//app.set(cors());                        //https://github.com/expressjs/cors
app.set('view engine', 'hbs');          //indica q vamos a usar el motor de plantillas HBS // entra a la carpeta views
app.set('views', "./views" );    

console.log('\x1Bc'); //le hace un clear al nodemon
console.log("\x1b[32m----- Server iniciado ----- \x1b[0m");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use(express.bodyParser());
app.use(express.urlencoded( {extended: false} ) );
app.use(express.json()); 



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
//#endregion


app.get('/', function(req, res){
    //res.render('templates', {titulo: 'pug', mensaje: 'Hola app.js!!', personas: personas})
    res.send("Ola app.js!!!");
    console.log("Conexxion a ola app.js");
});

app.get('/partes/:pParam', function (req, res) { res.render( req.params.pParam ); console.log(" Partes: "+req.params.pParam); });    
    


//#region ---------------------- GET BD ----------------------------------------------

app.get('/bd_Load/:pParam', (req, res)=>{ BD.GET_ALL(req.params.pParam, (data)=>{ res.send(data)}) });

//#endregion
//#region ---------------------- SET BD ----------------------------------------------

app.post('/PUT_ONE/:pParam', cors(), function(req, res){
    let miItem = req.body;   
    BD.PUT_ONE(miItem, req.params.pParam, (data)=>{
        res.send(data);
    })
    console.log("guardar: "+req.params.pParam);   
});

app.post('/PUT_ALL/:pParam', cors(), function(req, res){
    let Items = req.body;   
    BD.PUT_ALL(Items, req.params.pParam, (data)=>{
        res.send(data);
    })
    console.log("PUT_ALL: "+req.params.pParam);   
});

//#endregion
app.listen(3000, '0.0.0.0',  function(){    
});


//#region En desuso
/*
app.get('/actores_y_clases', function(req, res){
    console.log(" /actores_y_clases");
    BD.GET_Actores_Y_Clases( function(cActores, cClases){
        res.send( {
            actores: cActores,
            clases: cClases
        });
    });
});
*/
/*
app.get('/items', (req, res)=>{ BD_Manager.BD_GET("Items", (data)=>{ res.send(data)}) });
app.get('/enemies', (req, res)=>{ BD_Manager.BD_GET("Enemies", (data)=>{ res.send(data)}) });
app.get('/skills', (req, res)=>{ BD_Manager.BD_GET("Skills", (data)=>{ res.send(data)}) });
app.get('/weapons', (req, res)=>{ BD_Manager.BD_GET("Weapons", (data)=>{ res.send(data)}) });
app.get('/systemJson', (req, res)=>{ BD_Manager.BD_GET("System", (data)=>{ res.send(data)}) });
*/
//#endregion 

