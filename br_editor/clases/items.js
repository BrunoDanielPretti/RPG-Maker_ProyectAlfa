//#region M_PanItems{} Objeto para manejo del panel de items
    M_PanItems = {};

    M_PanItems.TablaItems = {};    
    M_PanItems.TablaItems.SelecId = null;
    
    if(localStorage.Items_modificados == undefined){
        M_PanItems.Modificados = {};
        //localStorage.Items_modificados = [];
        console.log("items IF");
    }else{
        M_PanItems.Modificados = JSON.parse( localStorage.Items_modificados );
        console.log("items Else");
    }
    
//#endregion
//#region //-------------- Armado y refresco de Panel ----------------------//
    function Items_ArmarPanel(){    //La funcion q hay q llamar para armar todo el panel   
        Panel_Cargar( ()=>{ Items_ArmarTabla() }, "Items", bre.Items);
    }

    function Items_ArmarTabla(){         //dibuja la tabla del panel de edicion        
        //$("#Tabla_Head").attr("id", "Tabla_Head_Items");        
        $("#Tabla_Head_Items").empty();     
        // $("#Tabla_Body").attr("id", "Tabla_Body_Items");
        $("#Tabla_Body_Items").empty();         
        $("#Tabla_Head_Items").append( Tabla_ArmarHead( ["id", "Nombre", "Tipo", "Precio"] ) );

        // $("#supercosito").on('mousewheel', function(event) {         
        //     event.preventDefault();        
        //     var scrollTop = this.scrollTop;
        //     this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -5));
        // });

        let cont = 0; 
        bre.Items.forEach(item => {          
            if(item != null){
                let fila = "<tr class='td-br item' filtro='true' onclick='Items_Armar_PanelEdicion("+item.id+")' target='tr_item_"+item.id+"' scrollName='tr_item'>";                              
                fila += "</tr>";
                $("#Tabla_Body_Items").append(fila);
                Items_escribir_td(item);
                
                cont++;
                if(M_PanItems.Modificados[cont] == undefined){
                    M_PanItems.Modificados[cont]= 0;                    
                }else if(M_PanItems.Modificados[cont] == 1){
                    $("[target=tr_item_"+cont+"]").addClass("tr-edited");
                }
            }                        
        });

        localStorage.Items_modificados = JSON.stringify(M_PanItems.Modificados);
                
        $("#panel_left_header").find("[type='checkbox']").change(function(){
            Items_TablaCheckbox_Reload();
        });                    
        Items_TablaCheckbox_Reload();        
    }
    function Items_TablaCheckbox_Reload(){
        if($("#Tab_items_Tipo_check").prop('checked')){
            $("#Tabla_Head_Items").find("[target='th_Tipo']").show();
            $("#Tabla_Body_Items").find("[name='item_tipe']").show();
        }else{
            $("#Tabla_Head_Items").find("[target='th_Tipo']").hide();
            $("#Tabla_Body_Items").find("[name='item_tipe']").hide();
        }

        if($("#Tab_items_Precio_check").prop('checked')){
            $("#Tabla_Head_Items").find("[target='th_Precio']").show();
            $("#Tabla_Body_Items").find("[name='item_precio']").show();
        }else{
            $("#Tabla_Head_Items").find("[target='th_Precio']").hide();
            $("#Tabla_Body_Items").find("[name='item_precio']").hide();
        }
    }
    function Items_escribir_td(item){
        let StringTipos = ["null", "Normal", "Clave","Oculto1", "Oculto2"]    
        let fila = "<td itemid="+item.id+">"+item.id+"</td>";
        fila += "<td name='item_name'>"+item.name+"</td>";                               
        fila += "<td name='item_tipe'>"+StringTipos[item.itypeId]+"</td>";             
        fila += "<td name='item_precio'>"+item.price+"</td>";                                            
        $("[target=tr_item_"+item.id+"]").html(fila);    
    }

    function Items_Armar_PanelEdicion(pId){  //Asigna los valores de el item con pId al panel de edicion
        
        let miItem = bre.Items[pId];
        //$("#panel_right").load("./views/Items_Panel_Edicion.html",function(){
        NexoV("Items_Panel_Edicion", "#panel_right", ()=>{            
            $("#Items_Panel_De_Edicion").attr("index", pId);
            //-------------------- General --------------//
            $("#Nombre_txt").val(miItem.name);
            $("#head_spam_for_id").html(miItem.id);
            $("#select_TipoDeObjeto").val(miItem.itypeId);
            $("#Precio_txt").val(miItem.price);
            $("#select_Consumible").val( bool_string(miItem.consumable) );                            
            $("#select_Scope").val(miItem.scope);
            $("#select_Ocasion").val(miItem.occasion);
            $("#Descripcion_txt").html(miItem.description);        
            $("#Item_Icono").brDibujarIcono_Compuesto(miItem);            
            $("#Item_Icono").click(function(){
                Draw_TablaDeIconos("#Modal_SelecIconos", miItem, Items_OnChange);
            })            
                        
            //-------------------- Invocacion y Daño --------------//
            $("#Velocidad_txt").val(miItem.speed);
            $("#Exito_txt").val(miItem.successRate);
            $("#Repeticion_txt").val(miItem.repeats);
            $("#TP_txt").val(miItem.tpGain);
            $("#select_TipoDeGolpe").val(miItem.hitType);
            $("#btn_animacion").html( Set_Html_ForAnimationButton(miItem.animationId) );
            $("#btn_animacion").click( function(){ 
                Menu_SeleccionDeEfecto("Animations", function(pAnimID){
                    miItem.animationId = pAnimID;
                    Items_OnChange(miItem);
                }); 
            } );

            $("#select_TipoDeDamage").val(miItem.damage.type);
            $("#select_Elemento").val(miItem.damage.elementId);
            $("#FormulaDamage_txt").html(miItem.damage.formula);
            $("#Variacion_txt").val(miItem.damage.variance);
            $("#select_Criticos").val( bool_string(miItem.damage.critical) );
            options_set_Elemento("#select_Elemento");
            $("#select_Elemento").val( miItem.damage.elementId);

            //---------------------------- Botones -----------------------------------//
            $("#btn_guardar").click(function(){      
                Items_Exportar(miItem);
            });
            
            $("#btn_cargar_de_origin").click(function(){    
                bre.Items[miItem.id] = JSON.parse( JSON.stringify(bre.origin.Items[miItem.id]));                                              
                miItem = bre.Items[miItem.id];
            
                $("[target=tr_item_"+miItem.id+"]").removeClass("tr-edited");
                M_PanItems.Modificados[miItem.id] = 0; 
                localStorage.Items_modificados = JSON.stringify(M_PanItems.Modificados);
                
                Items_escribir_td(miItem);                                               
                Items_Armar_PanelEdicion(pId);
                Items_TablaCheckbox_Reload();
                localStorage.Items = JSON.stringify(bre.Items);
               
            });


            //-------------------- Notas --------------//
            $("#Notas_txt").html(miItem.note); 

            //-----------------------------------------//
            if( $("#select_TipoDeDamage").val() == 0){
                $("#item_damage").find("[target='item_edit']").prop("disabled", true);            
            }else{
                $("#item_damage").find("[target='item_edit']").prop("disabled", false);            
            }

            $("[target='item_edit']").change( ()=>{ Items_OnChange(miItem) });
            
            $("[target=tr_item_"+M_PanItems.TablaItems.SelecId+"]").removeClass("tr-selected");
            M_PanItems.TablaItems.SelecId = pId;
            $("[target=tr_item_"+pId+"]").addClass("tr-selected");

            //-------------------- Efectos --------------//        
            miItem.effects.forEach(element => {                
                let tr = $("<tr></tr>");            
                var miEfecto = Decoder_EfectosDeUsables_ToString(element);                
                tr.append("<td>"+ miEfecto.tipo +"</td>");
                tr.append("<td>"+ miEfecto.data +"</td>");
                
                $("#Items_Panel_De_Efectos tbody").append(tr);                               
            });
           
                
            

            //------------------------- ToolTips ----------------------//
            $("#tltp_FormulaDeDano").load("./views/tooltips.html #TT_FormulasDeDano");

        });
        //$("[target=tdiv_FormulaDeDanor_item_"+pId+"]").attr("style", "color: yellow;");
        //console.log(bre.Items[pId]);

    }
    function Items_OnChange(miItem, callback){  //Cuando se hace un cambio en un item se guarda en bre.items{}
        let pId =  miItem.id;             
        //-------------------- General --------------//
        miItem.name = $("#Nombre_txt").val();    
        miItem.itypeId = parseInt( $("#select_TipoDeObjeto").val() );
        miItem.price = Int_MinMax( $("#Precio_txt").val(), 0) ;
        miItem.consumable = bool_string( $("#select_Consumible").val() );  
        miItem.scope = parseInt( $("#select_Scope").val() );
        miItem.occasion = parseInt( $("#select_Ocasion").val() );
        miItem.description = $("#Descripcion_txt").val(); 
        
        //-------------------- Invocacion y Daño --------------//
        miItem.speed = parseInt ($("#Velocidad_txt").val() );
        miItem.successRate = Int_MinMax( $("#Exito_txt").val(), 0, 100);
        miItem.repeats = Int_MinMax( $("#Repeticion_txt").val(), 1, 10);
        miItem.tpGain = Int_MinMax( $("#TP_txt").val(), 0); 
        miItem.hitType = parseInt( $("#select_TipoDeGolpe").val() );

        miItem.damage.type = parseInt( $("#select_TipoDeDamage").val() );    
        miItem.damage.elementId = parseInt( $("#select_Elemento").val() );
        miItem.damage.formula = $("#FormulaDamage_txt").val();
        miItem.damage.variance = Int_MinMax( $("#Variacion_txt").val(), 0);
        miItem.damage.critical = bool_string( $("#select_Criticos").val() );
                            
        //-------------------- Notas --------------//
        miItem.note = $("#Notas_txt").val(); 
        //-----------------------------------------//
                                 
        Items_escribir_td(miItem);
        $("[target=tr_item_"+pId+"]").addClass("tr-edited");
        M_PanItems.Modificados[pId] = 1;
        localStorage.Items_modificados = JSON.stringify(M_PanItems.Modificados);
        
        Items_Armar_PanelEdicion(pId);
        Items_TablaCheckbox_Reload();
        localStorage.Items = JSON.stringify(bre.Items);

        if(callback)
            callback();
        //console.log("pId: "+pId);
        //console.log("bre.Items[pId]: "+bre.Items[pId].id)    
    }
//#endregion
//#region //-------------- Manejo General de Items ----------------------//
    function Items_GetBD(callback){  //carga en bre.items los datos de items.json
        bd_Load("Items", (data)=>{
            bre.Items = data;
            if(callback)
                callback();
        })
    }
    function Items_GET_PorId(pId){
    }
    function Items_Exportar(miItem){
        $("#btn_guardar").css("color", "yellow");
                $("#btn_guardar").addClass("brBtn-Amarillo");
                $("#btn_guardar").prop("disabled", true);
                $("#btn_guardar").addClass("No_Disabled");

                let send =  miItem;                
                send = JSON.stringify(send);
                $.ajax({
                    url: pNexo+"PUT_ONE/Items",
                    type: "POST",
                    data: send,            
                    contentType: "application/json"                                     
                }).done(function(data){
                    if(data = "ok"){
                        console.log("ok");
                        $("[target=tr_item_"+miItem.id+"]").removeClass("tr-edited");
                        $("#btn_guardar").css("color", "#25f225");
                        $("#btn_guardar").removeClass("brBtn-Amarillo");
                        $("#btn_guardar").addClass("brBtn-Verde");
                        M_PanItems.Modificados[miItem.id] = 0;
                        localStorage.Items_modificados = JSON.stringify(M_PanItems.Modificados);
                        bd_Load("Items", (data)=>{
                            bre.origin.Items = data;                            
                        });        
                                                                       
                        setTimeout(()=>{
                            $("#btn_guardar").css("color", "#bebebe")                            
                            $("#btn_guardar").removeClass("brBtn-Verde");
                            $("#btn_guardar").prop("disabled", false);
                            $("#btn_guardar").removeClass("No_Disabled");
                        }, 1000);                        
                    }                                           
                }).fail(function(error){
                    console.log("Fail: ", error);
                });                                
    }
    function Items_Exportar_Todos( este=undefined ){
        console.log("Items_Exportar_Todos()");
        
        $(este).find("span").css("color", "yellow");              

        let send =  bre.Items;                
        send = JSON.stringify(send);
        $.ajax({
            url: pNexo+"PUT_ALL/Items",
            type: "POST",
            data: send,            
            contentType: "application/json"                                     
        }).done(function(data){
            //console.log(data);
            $(este).find("span").css("color", "#25f225");
            setTimeout(()=>{
                $(este).find("span").css("color", "unset");
            },1000)
                   
            localStorage.removeItem("Items_modificados");
            M_PanItems.Modificados = {};     

            if( $("#principal").attr("who") == "Items"){
                            
                Items_ArmarTabla();
                let item_index = $("#Items_Panel_De_Edicion").attr("index");
                if(item_index){
                    Items_Armar_PanelEdicion(item_index);
                }                                    
            }                          
        }).fail(function(error){
            console.log("Fail: ", error);
        });                                                  
    }
//#endregion

//#region  ---- codigo en desuso
/*  COMENTARIO!!!!!!!!!!!!!!!!!!!               ======  Ejemplo de evento para la ruedita
    $("#head_spam").bind('wheel', function(e){
        console.log(e.originalEvent.deltaY);
        if(e.originalEvent.deltaY < 0) {
            console.log('scrolling up !');
        }
        else{
            console.log('scrolling down !');
        }
    });






    function NoseComoLLamarla(){
        $("[itemid]").each( (key)=>{
            if(key > bre.tablaCont+4 || key < bre.tablaCont-6){
                $("[target='tr_item_"+(key+1)+"']").hide();
            }else{
                $("[target='tr_item_"+(key+1)+"']").show()
            }           
        })
    }

    $("#Tabla_Body_Items").bind('wheel', function(e){      
        if(e.originalEvent.deltaY < 0) {            
            if(M_PanItems.TablaItems.cont > 1){            
                M_PanItems.TablaItems.cont -= 1;
                Tabla_Scroll_Action(M_PanItems.TablaItems); 
            }                                 
        }
        else{       
            if(M_PanItems.TablaItems.cont < M_PanItems.TablaItems.max - M_PanItems.TablaItems.show){
                M_PanItems.TablaItems.cont += 1;                
                Tabla_Scroll_Action(M_PanItems.TablaItems);
            }
        }
    });
    
    BrunoEvento = new Event("event_animacion");

    addEventListener('event_animacion', function (e) {
        console.log("se detecto el evento: "+e);   
    }, false);

*/


//function Tabla_Scroll_Action(pTabla){ //Recorre la tabla y oculta los tr... no se, me olvide
    //     $(pTabla.tag).children().each( function(key){
    //         //console.log( key+": "+$(this).html() );
    //         //console.log( $(this).attr("filtro") );
    //         let filtro = $(this).attr("filtro");
    //         if( (key+1 < pTabla.cont || key+1 > pTabla.cont + pTabla.show) || filtro == "false"){
    //             $(this).hide();
    //         }else if( filtro == "true" ){            
    //             $(this).show();
    //         }                
    //     });
    // }
    // function Tabla_Scroll_Event(e, pTabla){ //Hay q llamarlo cuando se vindea el evento wheel
    //     if(e.originalEvent.deltaY < 0) {            
    //         if(pTabla.cont > 1){            
    //             pTabla.cont -= 1;
    //             Tabla_Scroll_Action(pTabla); 
    //         }                                 
    //     }
    //     else{       
    //         if(pTabla.cont < pTabla.max - pTabla.show){
    //             pTabla.cont += 1;                
    //             Tabla_Scroll_Action(pTabla);
    //         }
    //     }
    // }

    /*
    function MenuDeAnimaciones_Mostrar(pParam, callback){        
        $("#myModal").html("");
        NexoP("Animaciones_Panel", "#myModal", ()=>{
            Modal_Mostrar();
            let fila = "<tr target='anim_tr' animId='"+-1+"' class='td-br'><td>Ataque normal</td></tr>" ;                                                                         
            fila += "<tr target='anim_tr' animId='"+0+"' class='td-br'><td>Ninguna</td></tr>";
            $("#anim_left_Tabla_Body").html(fila);
            $("#anim_Right_Tabla_Body").empty();
           
            fila="";
            let contTotal = 0;
            let cont = 0;
            bre.Animations.forEach(item =>{               
                if(cont == 20){
                    $("#anim_left_Tabla_Body").append("<tr class='td-br' contTotal='"+(contTotal-19)+"' target='Anim_page'> <td>[ "+(contTotal-19)+" - "+contTotal+" ]</td> </tr>");
                    cont = 0;
                }                
                cont++;
                contTotal++;             
            });
 
            $("[target='Anim_page']").click( function (){               
                let num = $(this).attr('contTotal');
                num = parseInt(num);                
                $("#anim_Right_Tabla_Body").empty();
                bre.Animations.forEach(item =>{
                    if(item && (item.id >= num && item.id <= (num+19) ) ){
                        $("#anim_Right_Tabla_Body").append(
                            "<tr class='td-br' target='anim_tr' animId='"+item.id+"'><td >"+item.id+"</td><td>"+item.name+"</td></tr>"
                        );
                    }
                })

                $("[target='anim_tr']").click( function(){
                    let animId = $(this).attr("animId") ;
                    //console.log(animId);                  
                    pParam.animationId = parseInt(animId);
                    callback(pParam);
                    Modal_Cerrar();                    
                })
            })
            
            $("[contTotal='1']").click(); //para inicializar la pagina derecha del 1 al 20
        });        
    }
    */

    // function FiltrarTabla(e, pTagId, pTdNum=1){
        
    //     let input, filter, table, tr, td, i, cont=0;
    //     input = e.target; 
    //     if(e.key == "Backspace"){
    //         input.value= "";
            
    //     }
        
    //     filter = input.value.toUpperCase();
    //     table = document.getElementById(pTagId);
    //     tr = table.getElementsByTagName("tr");
        
    //     // Loop through all table rows, and hide those who don't match the search query
    //     for (i = 0; i < tr.length; i++) {    
            
    //         let miTr = $("[target='"+tr[i].attributes.target.value+"']");        
    //         td = tr[i].getElementsByTagName("td")[pTdNum]; //el 1 es para la segunda columna, 0 la primera (para q busque por nombre)
    //         if (td) {
    //         if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
    //                 //tr[i].style.display = "";
    //                 //console.log( tr[i].attributes.target.value )    ;
    //                 miTr.attr("filtro", "true");
    //                 //console.log( $("[target='tr_item_2']") );
    //                 cont++;
    //             } else {
    //                 miTr.attr("filtro", "false");
    //                 //tr[i].style.display = "none";
    //             }
    //         }
    //     }

    //     M_PanItems.TablaItems.max = cont;
    //     M_PanItems.TablaItems.cont = 1;
    //     //Tabla_Scroll_Action(M_PanItems.TablaItems);
        
    // }

//#endregion