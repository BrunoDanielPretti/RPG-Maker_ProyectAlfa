const fs = require('fs');
const BD_JSON_SPACES = " "; //la cantidad de espacion q va a escribir en el JSON
const DIR_BD = '../data/'; //La direccion donde esta la BD del juego

module.exports = {
    GET_ALL,
    PUT_ONE,
    PUT_ALL    
}

//------------------------------------ ACTORES Y CLASES ---------------------------------------------
                   
function GET_ALL(pNombreArchivo, callback){
    fs.readFile(DIR_BD+pNombreArchivo+'.json', 'utf-8', (error, data)=>{
        if(error){
            console.log(`Error ${error}`);
        }else{
            console.log(" GET: "+pNombreArchivo+".json");
            data = JSON.parse(data);                 
            callback(data);
        }
    })
}
function PUT_ONE(pItem, pPath, callback){           
    pPath = DIR_BD+pPath+'.json'; 
    fs.readFile(pPath, 'utf-8', (error, data)=>{
        if(error){
            console.log(`Error ${error}`);
            throw err;
        }else{
            data = JSON.parse(data);     
            data.forEach((elem, index) => {
                if(elem != null && elem.id == pItem.id){
                    data[index] = pItem;
                    console.log(index);

                    dataJSON = data;
                    data = JSON.stringify(data, null, BD_JSON_SPACES);
                    
                    fs.writeFile(pPath, data, (error)=>{
                        if(error){
                            console.log("Error: "+error);
                        }else{
                            console.log("guardado: "+index);
                        }
                    });
                
                    callback("ok");                    
                }                
            });
            //callback("nop");                                                   
        }
    })    
}
function PUT_ALL(pItems, pPath, callback){           
    pPath = DIR_BD+pPath+'.json'; 
    pItems = JSON.stringify(pItems, null, BD_JSON_SPACES);
    fs.writeFile(pPath, pItems, function (err) {
        if (err){
            throw err;
        } 
        console.log('Saved!');
        callback("ok");
      }); 
}


//#region Desuso
/*
function GET_Actores_Y_Clases(callback){
    GET_Actores( function(pMisActores){
        let Actores = pMisActores;            
        GET_Clases( function(pMisClases){
            let Clases = pMisClases;
            callback(Actores, Clases);
        })          
    })
};

function GET_Actores (callback){ BD_GET("Actors", (data)=>{ callback(data); }) };
function GET_Clases  (callback){ BD_GET("Classes", (data)=>{ callback(data); }) };
function GET_Items   (callback){ BD_GET("Items", (data)=>{ callback(data); }) };
function GET_Enemies (callback){ BD_GET("Enemies", (data)=>{ callback(data); }) };
*/
//#endregion


