(function(){
    function Sprite_Circulo() {
        this.initialize.apply(this, arguments);
    }

    Sprite_Circulo.prototype = Object.create(Sprite_Base.prototype);
    Sprite_Circulo.prototype.constructor = Sprite_Circulo;

    Sprite_Circulo.prototype.initialize = function() {
        Sprite_Base.prototype.initialize.call(this);
        this.crearBitmap();
        this.MarcarPosicion();
    };

    Sprite_Circulo.prototype.crearBitmap = function(){
        this.bitmap = ImageManager.loadPicture('circulo1');

    };

    Sprite_Circulo.prototype.MarcarPosicion = function(){
        this.anchor.x = 0.5; //0 izquierda, 1 derecha
        this.anchor.y = 0.5; //0 izquierda, 1 derecha
        this.x = 0;
        this.y = 0;   
        //this.opacity = 255;
    };

    Sprite_Circulo.prototype.update = function(){
        Sprite_Base.prototype.update.call(this);
        //this.rotation += 0.05;
        this.rotation += 0.001;               
    };

    var br_Alias_CrearTitulo_Particulas = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        br_Alias_CrearTitulo_Particulas.call(this);        
        var Circulo = new Sprite_Circulo();
        this.addChild(Circulo);
        //var florcita = new Sprite_Circulo();
        //this.addChild(florcita);
        //this.CrearCirculo();
    };
        
   //---------------------------------------------------------------------    
    
    Window_TitleCommand.prototype.makeCommandList = function() {        
        this.addCommand(TextManager.newGame,   'newGame');
        this.addCommand(TextManager.continue_, 'continue', this.isContinueEnabled());
        this.addCommand(TextManager.options,   'options');
        this.addCommand("Salir",   'quit');  //el quit es un handler q ya existe por defecto        
    };
    
    
    Scene_Title.prototype.createCommandWindow = function() {
        this._commandWindow = new Window_TitleCommand();        
        this._commandWindow.setHandler('newGame',  this.commandNewGame.bind(this));
        this._commandWindow.setHandler('continue', this.commandContinue.bind(this));
        this._commandWindow.setHandler('options',  this.commandOptions.bind(this));
        this._commandWindow.setHandler('quit',     this.commandQuit.bind(this));
        this._commandWindow.width = 400;
        this._commandWindow.x = 597;
        this._commandWindow.height = 288;
        this.addWindow(this._commandWindow);        
    };
    
    Scene_Title.prototype.commandQuit = function(){
        SceneManager.exit();
    };
    
})();






