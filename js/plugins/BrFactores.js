/*:
* @param FPM
* @desc Factor de poder Magico
* @default 100
*/

var Br_factores_param = PluginManager.parameters('BrFactores');
BrFactores_Console("Br_Factores Empezo");

br.FPM = Number(Br_factores_param['FPM'] || 100) / 100;
br.FPM_Zona = br.FPM;
BrFactores_Console("Br_Creado: FPM: "+br.FPM+"  FPM_Zona: "+br.FPM_Zona);

(function(){
    
    var BrAlias_BattleStart = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function(){    
        BrAlias_BattleStart.call(this);   
        br.FPM = br.FPM_Zona;
        BrFactores_Console("Empieza la batalla: FPM: "+br.FPM+"  FPM_Zona: "+br.FPM_Zona);
    };
    
    var BrAlias_BattleTerminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        BrAlias_BattleTerminate.call(this);
        //BrFactores_Console("Sale de la batalla: FPM: "+br.FPM+"  FPM_Zona: "+br.FPM_Zona);
        br.FPM = br.FPM_Zona;
        BrFactores_Console("Salio de la batalla: FPM: "+br.FPM+"  FPM_Zona: "+br.FPM_Zona);    
    };
    
    br.FactorFPM = function(pValue){
        br.FPM = br.FPM_Zona * pValue / 100;
        BrFactores_Console("FPM_Combate Cambiado a: " + br.FPM + "   Zona: " + br.FPM_Zona);
    };

    br.SetFPM = function(pValue){
        br.FPM = pValue / 100;
        BrFactores_Console("FPM_Combate Cambiado a: " + br.FPM);
    };

    br.ZoneFPM = function(pValue){
        br.FPM_Zona = pValue / 100;
        BrFactores_Console("FPM_Zona Cambiado a: " + br.FPM_Zona);
    };
    
    //---------------------------------------------------------------------------
    var brMiComando = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        brMiComando.apply(this); //en vez de el call por q se llama a el mismo
        if(command === "br"){
            switch(args[0]){
                case "zona":
                    br.FPM_Zona = Number(args[1]) / 100;
                    BrFactores_Console("FPM_Zona Cambiado a: " + br.FPM_Zona);
                    break;
                case "consola":                
                    console.log(args[1]+" "+args[2]);
                    break;
            }
        }        
    };
    
})();















