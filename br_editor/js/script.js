//#region --------------------------- Constantes ------------------------------------//
const pNexo = "http://localhost:3000/";
//#endregion
//#region --------------------------- NEXO ------------------------------------//
    function Nexo(param, destino="#principal", metodo="GET", callback){
        pagina = pNexo+param; // "nexo.php/partes/menuSesion"
        $.ajax({
            url: pagina,
            type: metodo
        }).done(function(datos){
            $(destino).html(datos);
            if(callback)
                callback();
            //console.log(datos);
        })    
    }

    function NexoP(param, destino="#principal", callback){        
        Nexo("partes/"+param, destino, "GET", ()=>{
            if(callback)
                callback();
        });                
    }

    function NexoV(param, destino="#principal", callback){     
        $.ajax({
            url: "./views/"+param+".html",
            type: "GET",
            dataType: "HTML"
        }).done(function(datos){            
            $(destino).html(datos)
            if(callback)
                callback();
        })
    }
//#endregion
//#region --------------------------- NavBar ------------------------------------//  
    function btnNav_Items(){                
        BrConsoleFunct("btnNav_Items()");                      
        Items_ArmarPanel();
    }                
//#endregion    
//#region --------------------------- ACTORES ------------------------------------//    
//#endregion
//#region --------------------------- Manejo Base de datos ------------------------------------//    
    function bd_Load(pParam, callback){
        $.ajax({
            url: pNexo+"bd_Load/"+pParam,
            method: "GET"
        }).done( (datos)=>{                                        
            if(callback)
                callback(datos);
        }).fail( (datos, error2, error3)=>{
            console.log("error "+error2+" "+error3);
        })
    }

    function BD_Cargar_todo(){
        console.log("BD_Cargar_todo()");
        bd_Load("System", (data)=>{
            bre.System = data;        
        });
        bd_Load("Animations", (data)=>{
            bre.Animations = data;        
        });
        bd_Load("States", (data)=>{
            bre.States = data;        
        });
        bd_Load("Items", (data)=>{            
            bre.origin.Items = data;
            if(localStorage.Items == undefined){
                //console.log("IF");
                bre.Items = data;
                localStorage.Items = JSON.stringify(data);
            }else{
                //console.log("ELSE");
                bre.Items =  JSON.parse(localStorage.Items);
            }
            //TablaDinamica(bre.Items);
        });
        bd_Load("Actors", (data)=>{  
            bre.origin.Actores = data;
            if(localStorage.Actores == undefined){           
                bre.Actores = data;
                localStorage.Actores = JSON.stringify(data);
            }else{               
                bre.Actores =  JSON.parse(localStorage.Actores);
            }
            
        });  
        bd_Load("Classes", (data)=>{           
            bre.origin.Clases = data;
            if(localStorage.Clases == undefined){           
                bre.Clases = data;
                localStorage.Clases = JSON.stringify(data);
            }else{               
                bre.Clases =  JSON.parse(localStorage.Clases);
            }
        });               
    }
    function BD_Eliminar_LocalStorage(){
        localStorage.removeItem('Items');
        localStorage.removeItem('Items_modificados');
        localStorage.removeItem('Actores');
        localStorage.removeItem('Clases');
        BD_Cargar_todo();
    }    
       
//#endregion        
//#region --------------------------- Funciones Basicas ------------------------------------//
    function Tabla_ArmarHead(pArray){
        var string = "";
        var cont = 1;
        pArray.forEach(element => {
            string = string+"<th target='th_"+element+"' onclick=\"w3.sortHTML('#Tabla_General','.item', 'td:nth-child("+cont+")')\">"+element+"</th>";
            cont++;
        });        
        //$("#Tabla_Head").html(string);
        return string;
    }
    function Mostrar_MyBD(){
        console.clear();
        console.log("---------------/ MyBD /---------------");
        console.log("Actores", bre.Actores);
        console.log("Clases", bre.Clases);
        console.log("Items", bre.Items);
        console.log("Mobs", bre.Mobs);
        console.log("Skills", bre.Skills);
        console.log("Armas", bre.Weapons);
        console.log("Animations", bre.Animations);
        console.log("States", bre.States);
        console.log("System", bre.System);                
    }
    function Mostrar_BD_Origin(){
        console.clear();
        console.log("---------------/ BD_Origin /---------------");
        console.log("Actores", bre.origin.Actores);
        console.log("Clases", bre.origin.Clases);
        console.log("Items", bre.origin.Items);
        console.log("Mobs", bre.origin.Mobs);
        console.log("Skills", bre.origin.Skills);
        console.log("Armas", bre.origin.Weapons);                     
    }
    function Guardar_MyBD_Todas( myTag){        
        Items_Exportar_Todos();
        $(myTag).find("span").css("color", "yellow");        
        setTimeout(()=>{
           $(myTag).find("span").css("color", "unset");
        }, 1000)
    }   
    function Panel_Cargar(callback, pWho="nadie", pEntidadBre){
        if(pEntidadBre == undefined){
            console.log("Error: bre."+pWho+" == undefined");
            $("#principal").html("Error: bre."+pWho+" == undefined");
            return false;
        }
        if( $("#panel_left").attr("id") == undefined ){        
            $("#principal").load("views/paneles.html",()=>{
                $("#principal").attr("who", pWho);
                callback();
            });           
        }else{                        
            callback();
        }
    }
    function Modal_Mostrar(pDestino = "#myModal"){               
        $(pDestino).attr("style", "display: block");
    }
    function Modal_Cerrar(pDestino = "#myModal"){
        //console.log("Modal_Cerrar()");
        $(pDestino).html("");             
        $(pDestino).attr("style", "display: none");        
    }
    function Modal_Ocultar(pDestino = "#myModal"){                
        $(pDestino).attr("style", "display: none");        
    }

    function Int_MinMax(pParam, min =null, max=null){ //Parse pParam a Int y hace q este entre min y max
        pParam = parseInt(pParam);
        if(min != null && pParam <= min)
            return min;
        if(max != null && pParam >= max)
            return max;
        return pParam;
    }
    function isNumberKey(evt){  //para cuando se presiona una tecla, determina si se apreto un numero
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)){        
            return false;        
        }    
        return true;
    }
    function bool_string(pParam){ //transforma String a Bool y viceversa
        if(pParam === true)
            return "True";
        if(pParam === false)
            return "False"
        if(pParam === "True")
            return true;
        if(pParam === "False")
            return false;
        console.log("Error en bool_string()");
        return null;
    }
    function options_set_Elemento(pTagId){ //Setea el boton de seleccion de elementos se le pasa el Id del Tag
        $(pTagId).append("<option value='-1'>Ataque Normal</option>");
        $(pTagId).append("<option value='0'>Ninguno</option>");

        for (let i = 1; i < bre.System.elements.length; i++) {
            $(pTagId).append("<option value='"+i+"'>"+bre.System.elements[i]+"</option>");
            //console.log(bre.System.elements[i]);        
        }
    }

    function TablaDinamica(pParam, pDestino="principal"){        
        let tabla = document.createElement('table'); 
        tabla.className = "table";  
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let cabecera = document.createElement('tr');

        for(let atributo in pParam[1]){
            let th = document.createElement('th');
            let txt = document.createTextNode(atributo);
            th.appendChild(txt);
            //th.textContent = atributo;
            cabecera.appendChild(th);
        }
        thead.appendChild(cabecera);
        tabla.appendChild(thead);

        for(let i in pParam){            
            if(pParam[i] != null){
                let fila = document.createElement('tr');                
                for(let j in pParam[i]){
                    let celda = document.createElement('td');
                    celda.className = "td-br item";

                    celda.addEventListener("click", function(){
                        console.clear();
                        if(j == 'id'){
                            console.dir(pParam[i]);
                        }else{
                            console.log(j+":");
                            console.dir(pParam[i][j]);                            
                        }                                             
                    })

                    switch (typeof(pParam[i][j])) {
                        case 'object':
                            var dato = document.createTextNode("[object]");                                                         
                            break;
                        case 'boolean':
                            var dato = document.createTextNode( pParam[i][j] );
                            celda.setAttribute("style", "color: red;");
                            break;
                        case 'number':
                                var dato = document.createTextNode( pParam[i][j] );
                                celda.setAttribute("style", "color: purple;");
                            break;    
                        case 'string':
                                var dato = document.createTextNode( pParam[i][j] );
                                celda.setAttribute("style", "color: orange;");
                            break;
                        default:
                            var dato = document.createTextNode( pParam[i][j] );
                            break;
                    }
                    /*
                    if( typeof(pParam[i][j]) != 'object'){
                        var dato = document.createTextNode( pParam[i][j] );                        
                    }else{
                        var dato = document.createTextNode("OBJETO");
                    }
                    */
                    celda.appendChild(dato);
                    fila.appendChild(celda);
                    
                }
                tbody.appendChild(fila);
            }
        }
        tabla.appendChild(tbody);
        // document.getElementById(pDestino).appendChild(tabla);
        $("#"+pDestino).html(tabla);
    }

   
//#endregion
//#region  //-------------- Menu de seleccion de efectos ----------------------//    
    function Menu_SeleccionDeEfecto(bdName, callback){        
        NexoV("menu_SeleccionDeEfecto", "#myModal", function(){  
            switch (bdName) {
                case "Animations":
                    pBreObj = bre.Animations;
                    $("#efect_panel_title").html("Animaciones");
                    let fila = "<tr target='efect_tr' efectid='"+-1+"' class='td-br'><td>Ataque normal</td></tr>" ;                                                                         
                    fila += "<tr target='efect_tr' efectid='"+0+"' class='td-br'><td>Ninguna</td></tr>";
                    $("#efect_left_Tabla_Body").html(fila);
                    break; 
                case "States":
                    pBreObj = bre.States;
                    $("#efect_panel_title").html("Estados");
                    break;
                default:
                    console.log("error en: Menu_SeleccionDeEfecto()");
                    return false;
                    break;
            }                                  
            Modal_Mostrar();
            $("#efect_Right_Tabla_Body").empty();

            let contTotal = 0;
            let cont = 0;
            pBreObj.forEach(item =>{               
                if(cont == 20){
                    $("#efect_left_Tabla_Body").append("<tr class='td-br' contTotal='"+(contTotal-19)+"' target='efect_page'> <td>[ "+(contTotal-19)+" - "+contTotal+" ]</td> </tr>");
                    cont = 0;
                }                
                cont++;
                contTotal++;             
            });

            pBreObj.forEach(item =>{  
                if(item != null){
                    $("#efect_Right_Tabla_Body").append(
                        "<tr class='td-br' target='efect_tr' id='efectid "+item.id+"'  efectId='"+item.id+"'><td >"+item.id+"</td><td>"+item.name+"</td></tr>"
                    );     
                }
            });

            $("[target='efect_page']").click( function (){
                let param = $(this).attr("conttotal");
                location.href = '#efectid '+param;
            });

            $("[target='efect_tr']").click( function(){
                let efectId = parseInt( $(this).attr("efectId") );                                                        
                console.log(efectId);
                Modal_Cerrar();   
                if(callback)                 
                    callback(efectId);
            })

        });
    }

    function Set_Html_ForAnimationButton(pId){
        if(pId == -1){
            return "Ataque Normal";
        }if(pId == 0){
            return "Ninguna";
        }else{
            return bre.Animations[pId].name;
        }        
    }

    function Decoder_EfectosDeUsables_ToString(pCode){
        switch (pCode) {
            case 11:    return "Recuperar PV"                
            case 12:    return "Recuperar PM"                
            case 13:    return "Ganar PT"               
            case 21:    return "Añadir Estado"                 
            case 22:    return "Remover Estado"
            case 31:    return "Añadir Ventaja"
            case 32:    return "Añadir Desventaja"
            case 33:    return "Quitar Ventaja"
            case 34:    return "Quitar Desventaja"
            case 41:    return "Efecto Especial"
            case 42:    return "Aumentar Estadistica"
            case 43:    return "Aprender Habilidad"
            case 44:    return "Evento Comun"
            default:
                console.log('Error en: Decoder_EfectosDeUsables_ToString('+pCode+')');
                break;
        }
    }
//#endregion
//#region --------------------------- PRUEBAS!!! -------------------------------
    function Prueba(){
        BrConsoleFunct("Prueba()");
        
        //console.log( $("#Tabla_Head").attr("id") );
        
        Draw_TablaDeIconos("#Modal_SelecIconos");
        
    }

    function SubmenuOver(e){
        $(e).parent().css("background-color", "#64553c9d");             
    }
    function SubmenuOut(e){
        $(e).parent().css("background-color", "");
    }
//#endregion
//#region ---- codigo en desuso
/*
    function Load_JSON(src, callback) {
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src + '.json';
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
            
        xhr.onload = function() {
            if (xhr.status < 400) {                    
                callback( JSON.parse(xhr.responseText) );
            }
        };
        xhr.onerror = this._mapLoader || function() {        
            console.log("error");
        };    
        xhr.send();
    };

    function Load_HTML(src, callback) {
        var xhr = new XMLHttpRequest();
        var url = "br/partes/"+src+".html";
        xhr.open('GET', url);
        xhr.overrideMimeType('application/json');
            
        xhr.onload = function() {
            if (xhr.status < 400) {                    
                callback(xhr.responseText);
            }
        };
        xhr.onerror = this._mapLoader || function() {        
            console.log("error");
        };    
        xhr.send();
    };

    bd_Load_Clases = function(callback){
        BrConsole_DataBaseGet("Load_Clases");
        Load_JSON("Classes", function(data){
            bre.Clases = data;
            if(callback)
                callback(); 
        })        
    }
    bd_Load_Items = function(callback){
        BrConsole_DataBaseGet("Load_Items");
        Load_JSON("Items", function(data){
            bre.Items = data;
            if(callback)
                callback();
        })        
    }
*/
//#endregion

