window.onload = function(){    
    if(br.DebugFlag == true){
        BrConsole("Inicio, Modo debug ON", verde);
    }else{
        console.log("inicio, Modo debug OFF");
    }
    //#region Objeto bre{}  
        bre = {}; //Objeto general de la pagina de edicion
        bre.origin = {};
        bre.IconSet = new Image();    
        bre.IconSet.src = ".././img/system/IconSet.png";
        bre.flag_TablaDeIconosCargada = false;
        
    //#endregion
    //#region BD_Load       
    BD_Cargar_todo();
    
    //console.log(Decoder_EfectosDeUsables_ToString(22));
        
    //#endregion                                 
   
    $("#NavbarZone").load("views/Navbar.html");
        
    NexoV("pruebas", "#principal");
    

    window.onclick = function(event) {
        var modal = document.getElementById('myModal');
        var modal2 = document.getElementById('myModal2');
        var Modal_SelecIconos = document.getElementById("Modal_SelecIconos");

        if (event.target == modal) {           
            Modal_Ocultar("#myModal");
        }
        else if (event.target == modal2) {                      
            $("#myModal2").attr("style", "display: none");
        }
        else if (event.target == Modal_SelecIconos){
            Modal_Ocultar("#Modal_SelecIconos")
        }
               
    }    
             
}
//------------------------------------------------------------------------------------------------------





function Draw_TablaDeIconos(pDestino = "#principal", pObject=null, callback_a){    
    //#region //-- Funciones --//
        if(pObject.icon == undefined){
            pObject.icon = new Array(0, 0, 0, 0);  //icon no viene por defecto en la base del RPG Maker                      
        }
               
        function Panel(pParam){  //Para buscar solo dentro del Panel este
            return $("#Menu_Selec_Icon").find(pParam);
        }

        function DibujarIconoFinal(){               
            $("#Icono_Final").CanvasLimpiar();
            $("div.box_icono").find('[target="span_BaseIndex"]').each( function(){               
                brDibujarIcono( parseInt( $(this).html() ), "Icono_Final");
            })       
        };

        function HacerCuandoYaEstaCargada(){
            Panel("#btn_Aceptar").unbind("click");
            Panel("#btn_Aceptar").click(function(){         
                pObject.icon[0] = parseInt( Panel("#Icono_Base").parent().find('[target="span_BaseIndex"]').html() );
                pObject.icon[1] = parseInt( Panel("#Icono_1").parent().find('[target="span_BaseIndex"]').html() );
                pObject.icon[2] = parseInt( Panel("#Icono_2").parent().find('[target="span_BaseIndex"]').html() );
                pObject.icon[3] = parseInt( Panel("#Icono_3").parent().find('[target="span_BaseIndex"]').html() );
                if(callback_a)            
                    callback_a(pObject);
                Modal_Ocultar(pDestino);                             
            });    
            
            Modal_Mostrar(pDestino);
            Panel('[target="box_icono"]').find("canvas").CanvasLimpiar();           
            Panel('[target="span_BaseIndex"]').html('0');

            Panel("#Icono_Base").parent().find('[target="span_BaseIndex"]').html(pObject.icon[0]);
            Panel('#Icono_Base').brDibujarIcono_ForCanvas(pObject.icon[0]);

            Panel("#Icono_1").parent().find('[target="span_BaseIndex"]').html(pObject.icon[1]);
            Panel('#Icono_1').brDibujarIcono_ForCanvas(pObject.icon[1]);

            Panel("#Icono_2").parent().find('[target="span_BaseIndex"]').html(pObject.icon[2]);
            Panel('#Icono_2').brDibujarIcono_ForCanvas(pObject.icon[2]);

            Panel("#Icono_3").parent().find('[target="span_BaseIndex"]').html(pObject.icon[3]);
            Panel('#Icono_3').brDibujarIcono_ForCanvas(pObject.icon[3]);

            DibujarIconoFinal();
        };
    //#endregion
    if(bre.flag_TablaDeIconosCargada){
        console.log("Tabla de iconos ya esta cargada");
        HacerCuandoYaEstaCargada();              
        return null;        
    }else{
        console.log("NO esta cargada");
        bre.flag_TablaDeIconosCargada = true;
    }
    //--------------------------------------------------------------------------------
    //$(pDestino).load("./views/Panel_Seleccion_de_Icono.html", function(){
    //NexoP("Panel_Seleccion_de_Icono", pDestino, function(){
    NexoV("Panel_Seleccion_de_Icono", pDestino, function(){
        let filas_cant = bre.IconSet.naturalHeight /32;
        let columnas_cant = bre.IconSet.naturalWidth /32;
        let index = 0;

        for (let i = 1; i <= filas_cant; i++) {
            for (let j = 1; j <= columnas_cant; j++) {
                Panel("#icon_panel").append( 
                    '<canvas id="canvas_'+index+'" width="32" height="32" class="brCanvas_scalable" target="Canvas_Panel_Icon" index="'+index+'"></canvas>'                    
                );             
                index++;                
            }
            Panel("#icon_panel").append("<br>");        
        }    
        for (let i = 0; i < index; i++) {       
            brDibujarIcono(i, "canvas_"+i );   
        }

        //-----------------
        Panel('[target="box_icono"]:first').addClass("box_icono_selected");

        Panel("[target='Canvas_Panel_Icon']").bind("mouseenter", function(){                       
            $("#span_index").html( $(this).attr("index") );
        });   
        Panel("[target='Canvas_Panel_Icon']").click(function(){            
            let index = $(this).attr("index");         
            Panel("div.box_icono_selected").find("canvas").CanvasLimpiar();
            Panel("div.box_icono_selected").find("canvas").brDibujarIcono_ForCanvas(index);            
            Panel("div.box_icono_selected").find('[target="span_BaseIndex"]').html(index);
            DibujarIconoFinal();
        })        

        Panel("#icon_panel").mouseleave( function(){
            Panel("#span_index").html( "Null" );
        });
        Panel("#icon_panel").on('mousewheel', function(event) {         
            event.preventDefault();
            var scrollTop = this.scrollTop;
            this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -5));
        });

        Panel('[target="box_icono"]').click(function(){
            Panel('[target="box_icono"]').removeClass("box_icono_selected")
            $(this).addClass("box_icono_selected");
        });
        
        //-----------------
        
        Panel("#btn_icono_a_0").click(function(){
            Panel("div.box_icono_selected").find("canvas").CanvasLimpiar();
            Panel("div.box_icono_selected").find('[target="span_BaseIndex"]').html("0");
            DibujarIconoFinal();
        });
        Panel("#btn_todos_a_0").click(function(){
            Panel("div.box_icono").find("canvas").CanvasLimpiar();
            Panel("div.box_icono").find('[target="span_BaseIndex"]').html("0");
            DibujarIconoFinal();
        });
                
        Panel(".background_selector").click(function(){            
            Panel('[target="Canvas_Panel_Icon"]').css("background-color", $(this).css("background-color"));
        });
        //-----------------
        HacerCuandoYaEstaCargada();                
        //-----------------                
    });        
}


jQuery.fn.extend({
    brDibujarIcono_ForCanvas: function(pId){ 
        //console.log(pItem) ;                                                      
        let ctx = this[0].getContext("2d"); //sin el let no anda

        let imagen = new Image();
        imagen.src = bre.IconSet.src;//"./img/system/IconSet.png";//"<img src='./img/system/IconSet.png'>";        
        let sx, sy, sw, sh, x, y, w, h;
    
        sx = pId % 16 * 32;
        sy = Math.floor(pId / 16) * 32;
        x=0; y=0;    
        w=32; h=32;    
        sw=32; sh=32;
            
        imagen.onload = function(){
            ctx.drawImage(imagen, sx ,sy, sw, sh,  x, y, w, h);
        }    
        
    },
    CanvasLimpiar: function(){        
        for (let i = 0; i < this.length; i++) {
            let canvas = this[i];
            let ctx = canvas.getContext("2d")
            ctx.clearRect(0, 0, canvas.width, canvas.height);            
        }                  
    },
    brDibujarIcono_Compuesto: function(pItem){
        if(pItem.icon == undefined){
            console.log("No tiene icono");  
            this.brDibujarIcono_ForCanvas(16);          
            return false;            
        }
        pItem.icon.forEach(iconId => {
            this.brDibujarIcono_ForCanvas(iconId);
        });                
    },
});

function brDibujarIcono(pId=0, pCanvas="brCanvas"){    
    let ctx = document.getElementById(pCanvas).getContext("2d");
    let imagen = new Image();
    imagen.src = bre.IconSet.src;//"./img/system/IconSet.png";//"<img src='./img/system/IconSet.png'>";        
    let sx, sy, sw, sh, x, y, w, h;

    sx = pId % 16 * 32;
    sy = Math.floor(pId / 16) * 32;
    x=0; y=0;    
    w=32; h=32;    
    sw=32; sh=32;
        
    imagen.onload = function(){
        ctx.drawImage(imagen, sx ,sy, sw, sh,  x, y, w, h);
    }    
}

/*
function brDibujarIcono_Compuesto(pItem){

}
*/
function Canvas_Limpiar(pCanvas="brCanvas"){
    let canvas = document.getElementById(pCanvas);
    let ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//#region ---- codigo en desuso
/*
function Load_Face(filename, hue){    
    return this.loadBitmap('img/faces/', filename, hue, true);   
}
*/

/*
function LoadBitMap(folder, filename, hue, smooth) {
    if (filename) {
        var path = folder + encodeURIComponent(filename) + '.png';
        var bitmap = loadNormalBitmap(path, hue || 0);
        bitmap.smooth = smooth;
        return bitmap;
    } else {
        return this.loadEmptyBitmap();
    }
};

function loadNormalBitmap(path, hue) {
    var key = this._generateCacheKey(path, hue);
    var bitmap = this._imageCache.get(key);
    if (!bitmap) {
        bitmap = Bitmap.load(path);
        bitmap.addLoadListener(function() {
            bitmap.rotateHue(hue);
        });
        this._imageCache.add(key, bitmap);
    }else if(!bitmap.isReady()){
        bitmap.decode();
    }

    return bitmap;
};

// bre.Actores = null;
    // bre.Clases = null;
    // bre.Items = null;
    // bre.Mobs  = null;
    // bre.Skills = null;
    // bre.Weapons = null;
    //bre.System = null;
    bre.tablaCont = 0;
    bre.tablaMax = 0;
    bre.tablaShowCant = 23   -1;
*/
//#endregion



 


















