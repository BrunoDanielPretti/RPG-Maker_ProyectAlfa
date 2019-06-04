/*:
* @param Debug
* @type boolean
* @on YES
* @off NO
* @desc Activa los mensajes por consola
* NO - false     YES - true
* @default true
*/
var br = {};

/*
    var BrCoreParametros = PluginManager.parameters('BrCore');
    var BrDebugFlag = String(BrCoreParametros['Debug'] || "NO") ;
    BrConsola("BrCore Activado!!!");
*/
    br.DebugFlag                                = true;
    br.Flag_DebugConsole_FunctionCall           = true;  //LLamadas a funciones normales
    br.Flag_DebugConsole_DataBaseGet            = true;  //LLamadas a funciones para TRAER datos de BD 
    br.Flag_DebugConsole_LoadedBD               = true;  //Muestra lo q esta cargado de la BD
    br.Flag_DebugConsole_DataGet                = true;  //Datos traidos de la base de datos
    br.Flag_BrFactores_Console                  = true;  //consola de BrFactores

    
// console.log("%c()", azul);


function BrConsole(pParam, color = null){
    if(br.DebugFlag == true)
        console.log("%c"+pParam, color);
}

function BrConsoleFunct(pParam){
    if(br.DebugFlag == true && br.Flag_DebugConsole_FunctionCall == true){
        console.log("%c"+pParam, azul);
    }
}
function BrConsole_DataBaseGet(pParam){
    if(br.DebugFlag == true && br.Flag_DebugConsole_DataBaseGet == true){
        console.log("%c"+pParam, azul);
    }
}

function BrConsole_LoadedBD(pParam){
    if(br.DebugFlag == true && br.Flag_DebugConsole_DataGet == true){
        console.log(pParam);
    }
}

function BrConsoleDataGet(pParam){
    if(br.DebugFlag == true && br.Flag_DebugConsole_DataGet == true){
        console.log(pParam);
    }
}

function BrFactores_Console(pParam){
    if(br.DebugFlag == true && br.Flag_BrFactores_Console == true){
        console.log(pParam);
    }
}

//--------------------------------- COLORES ------------------------------------//
var verde = "color: greenyellow";
var rojo  = "color: #fc504a";
var azul  = "color: rgb(66, 199, 252)";
var gris  = "color: #cccccc";