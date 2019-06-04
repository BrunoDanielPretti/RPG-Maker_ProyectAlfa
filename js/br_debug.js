//console.log("ASD");

Alias_Inicio = window.onload;
    window.onload = function(){
        Alias_Inicio.call(this);
        //console.log("EMPEZO!!!");

        //$("#modeTextBack").css("opacity", 1);
        $("#modeTextBack").remove();

        let timer_1 = this.setInterval( br_debugPage_reload , 10);

        $("#set_FPM").click( ()=>{ br.FPM = Get_MTB_Float(); br_debugPage_reload() } );
        $("#set_FPM_ZONA").click( ()=>{ br.FPM_Zona = Get_MTB_Float(); br_debugPage_reload()} );

        
    }

    

    function br_debugPage_reload(){
        $("#br_panel_left").empty();
        $("#br_panel_left").append("FPM: "+br.FPM+"   FPM_Zona: "+br.FPM_Zona+"<br>");
        if($gamePlayer != undefined){
            $("#br_panel_left").append(`X: ${$gamePlayer._x}    Y: ${$gamePlayer._y}`);
        }

        //----------------------------------
        $("#br_panel_right").empty();
        if($gameActors){
            
            $("#br_panel_right").append( $gameActors._data[1]._name+"   lv:"+ $gameActors._data[1]._level + "<br>") ;
            $("#br_panel_right").append( '<span id="btn_debug_hp" class="btn_debug"> </span>') ;
            $("#btn_debug_hp").html("hp: "+$gameActors._data[1]._hp);
            $("#btn_debug_hp").click(function(){
                $gameActors._data[1]._hp = $dataClasses[$gameActors._data[1]._classId].params[0][$gameActors._data[1]._level];
            })
            $("#br_panel_right").append("<br>");
            Object.getOwnPropertyNames($gamePlayer).forEach(element => {
                $("#br_panel_right").append(element+": "+$gamePlayer[element]+"<br>");
            });
            // $("#br_panel_right").append("<br>"+"mp: "+$gameActors._data[1]._mp+"<br>");
            // $("#br_panel_right").append("tp: "+$gameActors._data[1]._tp+"<br><br>");
            // $("#br_panel_right").append("_moveFrequency: "+$gamePlayer._moveFrequency+"<br>");
            // $("#br_panel_right").append("_moveRoute: "+$gamePlayer._moveRoute+"<br>");
            // $("#br_panel_right").append("_moveRouteIndex: "+$gamePlayer._moveRouteIndex+"<br>");
            // $("#br_panel_right").append("_moveSpeed: "+$gamePlayer._moveSpeed+"<br>");
            // $("#br_panel_right").append("_movementSuccess: "+$gamePlayer._movementSuccess+"<br>");
            // $("#br_panel_right").append("_encounterCount: "+$gamePlayer._encounterCount+"<br>");
            // $("#br_panel_right").append("_dashing: "+$gamePlayer._dashing+"<br>");
            // $("#br_panel_right").append("_direction: "+$gamePlayer._direction+"<br>");
            // $("#br_panel_right").append("_newDirection: "+$gamePlayer._newDirection+"<br>");
            // $("#br_panel_right").append("_stepAnime: "+$gamePlayer._stepAnime+"<br>");
            // $("#br_panel_right").append("_stopCount: "+$gamePlayer._stopCount+"<br>");
            //$("#br_panel_right").append("_encounterCount: "+$gameActors._data[1]._encounterCount+"<br>");

        }
        
    }

    

    function Get_MTB_Float(){
        let num = parseFloat( $("#MultiTextBox").val() );            
            if( isFinite(num) ){
               return num;
            }          
    }

    