//-----------------------------------------------------------------------------
// Scene_Menu
//
// The scene class of the menu screen.

function Scene_Menu() {
    this.initialize.apply(this, arguments);
}

Scene_Menu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Menu.prototype.constructor = Scene_Menu;

Scene_Menu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createStatusWindow();
    this.createCommandWindow();
    this.createGoldWindow();

};

Scene_Menu.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._statusWindow.refresh();
};



Scene_Menu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_MenuCommand(0, 0);
    this._commandWindow.setHandler('item',      this.commandItem.bind(this));
    this._commandWindow.setHandler('CartasHandler',     this.commandCartas.bind(this));
    this._commandWindow.setHandler('debugHandler',     this.commandDebug.bind(this));    
    this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
    this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
    this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
    this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
    this._commandWindow.setHandler('save',      this.commandSave.bind(this));
    this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
    this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
    this._commandWindow.x = this._statusWindow.width;
    this.addWindow(this._commandWindow);
};

Scene_Menu.prototype.commandCartas = function (){
    SceneManager.push(Scene_BrCard);
}
Scene_Menu.prototype.commandDebug = function (){
    SceneManager.push(Scene_BrDebug);
}

Scene_Menu.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
    this._goldWindow.x = this._statusWindow.width;
    this.addWindow(this._goldWindow);
};

Scene_Menu.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_MenuStatus(0, 0);  //this._commandWindow.width
    this._statusWindow.reserveFaceImages();
    this.addWindow(this._statusWindow);
};

Scene_Menu.prototype.commandItem = function() {
    SceneManager.push(Scene_Item);
};

Scene_Menu.prototype.commandPersonal = function() {
    this._statusWindow.setFormationMode(false);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onPersonalOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
};

Scene_Menu.prototype.commandFormation = function() {
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
};

Scene_Menu.prototype.commandOptions = function() {
    SceneManager.push(Scene_Options);
};

Scene_Menu.prototype.commandSave = function() {
    SceneManager.push(Scene_Save);
};

Scene_Menu.prototype.commandGameEnd = function() {
    SceneManager.push(Scene_GameEnd);
};

Scene_Menu.prototype.onPersonalOk = function() {
    switch (this._commandWindow.currentSymbol()) {
    case 'skill':
        SceneManager.push(Scene_Skill);
        break;
    case 'equip':
        SceneManager.push(Scene_Equip);
        break;
    case 'status':
        SceneManager.push(Scene_Status);
        break;
    }
};

Scene_Menu.prototype.onPersonalCancel = function() {
    this._statusWindow.deselect();
    this._commandWindow.activate();
};

Scene_Menu.prototype.onFormationOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

Scene_Menu.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    } else {
        this._statusWindow.deselect();
        this._commandWindow.activate();
    }
};

//-----------------------------------------------------------------------------
// Window_MenuCommand
//
// The window for selecting a command on the menu screen.

function Window_MenuCommand() {
    this.initialize.apply(this, arguments);
}

Window_MenuCommand.prototype = Object.create(Window_Command.prototype);
Window_MenuCommand.prototype.constructor = Window_MenuCommand;

Window_MenuCommand.prototype.initialize = function(x, y) {
    Window_Command.prototype.initialize.call(this, x, y);
    this.selectLast();
};

Window_MenuCommand._lastCommandSymbol = null;

Window_MenuCommand.initCommandPosition = function() {
    this._lastCommandSymbol = null;
};

Window_MenuCommand.prototype.windowWidth = function() {
    return 240;
};

Window_MenuCommand.prototype.numVisibleRows = function() {
    return this.maxItems();
};

Window_MenuCommand.prototype.makeCommandList = function() {
    this.addMainCommands();
    this.addCommand("Cartas", 'CartasHandler');
    this.addCommand("Debug", 'debugHandler');    
    this.addFormationCommand();
    this.addOriginalCommands();
    this.addOptionsCommand();
    this.addSaveCommand();
    this.addGameEndCommand();
};

Window_MenuCommand.prototype.addMainCommands = function() {
    var enabled = this.areMainCommandsEnabled();
    if (this.needsCommand('item')) {
        this.addCommand(TextManager.item, 'item', enabled);
    }
    if (this.needsCommand('skill')) {
        this.addCommand(TextManager.skill, 'skill', enabled);
    }
    if (this.needsCommand('equip')) {
        this.addCommand(TextManager.equip, 'equip', enabled);
    }
    if (this.needsCommand('status')) {
        this.addCommand(TextManager.status, 'status', enabled);
    }
};

Window_MenuCommand.prototype.addFormationCommand = function() {
    if (this.needsCommand('formation')) {
        var enabled = this.isFormationEnabled();
        this.addCommand(TextManager.formation, 'formation', enabled);
    }
};

Window_MenuCommand.prototype.addFormationCommand = function() {
    if (this.needsCommand('formation')) {
        var enabled = this.isFormationEnabled();
        this.addCommand(TextManager.formation, 'formation', enabled);
    }
};

Window_MenuCommand.prototype.addOriginalCommands = function() {
};

Window_MenuCommand.prototype.addOptionsCommand = function() {
    if (this.needsCommand('options')) {
        var enabled = this.isOptionsEnabled();
        this.addCommand(TextManager.options, 'options', enabled);
    }
};

Window_MenuCommand.prototype.addSaveCommand = function() {
    if (this.needsCommand('save')) {
        var enabled = this.isSaveEnabled();
        this.addCommand(TextManager.save, 'save', enabled);
    }
};

Window_MenuCommand.prototype.addGameEndCommand = function() {
    var enabled = this.isGameEndEnabled();
    this.addCommand(TextManager.gameEnd, 'gameEnd', enabled);
};

Window_MenuCommand.prototype.needsCommand = function(name) {
    var flags = $dataSystem.menuCommands;
    if (flags) {
        switch (name) {
        case 'item':
            return flags[0];
        case 'skill':
            return flags[1];
        case 'equip':
            return flags[2];
        case 'status':
            return flags[3];
        case 'formation':
            return flags[4];
        case 'save':
            return flags[5];
        }
    }
    return true;
};

Window_MenuCommand.prototype.areMainCommandsEnabled = function() {
    return $gameParty.exists();
};

Window_MenuCommand.prototype.isFormationEnabled = function() {
    return $gameParty.size() >= 2 && $gameSystem.isFormationEnabled();
};

Window_MenuCommand.prototype.isOptionsEnabled = function() {
    return true;
};

Window_MenuCommand.prototype.isSaveEnabled = function() {
    return !DataManager.isEventTest() && $gameSystem.isSaveEnabled();
};

Window_MenuCommand.prototype.isGameEndEnabled = function() {
    return true;
};

Window_MenuCommand.prototype.processOk = function() {
    Window_MenuCommand._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_MenuCommand.prototype.selectLast = function() {
    this.selectSymbol(Window_MenuCommand._lastCommandSymbol);
};


//---------------------- Ventana BrDebug ---------------------------------
function Ventana_Sencilla() {
    this.initialize.apply(this, arguments);
}

Ventana_Sencilla.prototype = Object.create(Window_Base.prototype);
Ventana_Sencilla.prototype.constructor = Ventana_Sencilla;

Ventana_Sencilla.prototype.initialize = function(x, y) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Ventana_Sencilla.prototype.windowWidth = function() {
    return 240;
};

Ventana_Sencilla.prototype.windowHeight = function() {
    //return this.fittingHeight(1);
    return 150;
};

Ventana_Sencilla.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();    
    this.drawTextEx( String(br.FPM_Zona), 34, 0);
    this.drawIcon(904,0,0);
    this.drawIcon(2526,0,0);    
};

Ventana_Sencilla.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

//------------------------------- Scene_BrDebug -----------------------------------

function Scene_BrDebug() {
    this.initialize.apply(this, arguments);
}
Scene_BrDebug.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BrDebug.prototype.constructor = Scene_BrDebug;

Scene_BrDebug.prototype.initialize = function(){
    Scene_MenuBase.prototype.initialize.call(this);
}

Scene_BrDebug.prototype.create = function(){
    console.log("Se creo la ventana");
    Scene_MenuBase.prototype.create.call(this);
    //Aca creamos las ventanas
    this._sencillaVentana = new Ventana_Sencilla();
    //this._sencillaVentana.x = Graphics.width / 2 ;  //la mitad de la aunchura de la pantalla
    //this._sencillaVentana.y = Graphics.height / 2 ; //la mitad de la altura de la pantalla
    this._sencillaVentana.x = 208 ;  
    this._sencillaVentana.y = 112 ; 
    this.addWindow(this._sencillaVentana);
    SoundManager.playOk();
}

Scene_BrDebug.prototype.update = function(){
    Scene_MenuBase.prototype.update.call(this);
}

Scene_BrDebug.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);    
};

Scene_BrDebug.prototype.update = function(){
    Scene_MenuBase.prototype.update.call(this);
    if(Input.isTriggered('cancel') ){
        SceneManager.goto(Scene_Map);
        SoundManager.playCancel();
    }
    
}
//---------------------- Ventana_Card ---------------------------------
function Ventana_Card() {
    this.initialize.apply(this, arguments);
}

Ventana_Card.prototype = Object.create(Window_Base.prototype);
Ventana_Card.prototype.constructor = Ventana_Card;

Ventana_Card.prototype.initialize = function(x, y) {    
    var width = this.windowWidth();
    var height = this.windowHeight();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
};

Ventana_Card.prototype.windowWidth = function() {
    return 200;//Graphics.width -32;
};

Ventana_Card.prototype.windowHeight = function() {    
    return 200;//Graphics.Height -32;
};

Ventana_Card.prototype.refresh = function() {
    var x = this.textPadding();
    var width = this.contents.width - this.textPadding() * 2;
    this.contents.clear();        
};

Ventana_Card.prototype.open = function() {
    this.refresh();
    Window_Base.prototype.open.call(this);
};

//------------------------------- Scene_BrCard -----------------------------------

function Scene_BrCard() {
    this.initialize.apply(this, arguments);
}

Scene_BrCard.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BrCard.prototype.constructor = Scene_BrCard;

Scene_BrCard.prototype.initialize = function(){
    Scene_MenuBase.prototype.initialize.call(this);
}

Scene_BrCard.prototype.create = function(){
    console.log("Se creo Scene_BrCard");
    Scene_MenuBase.prototype.create.call(this);    
    this._sencillaVentana = new Window_CardList();        
    this.addWindow(this._sencillaVentana);
    SoundManager.playOk();
    this.CrearCarta();
}

Scene_BrCard.prototype.update = function(){
    Scene_MenuBase.prototype.update.call(this);
}

Scene_BrCard.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);    
};

Scene_BrCard.prototype.update = function(){
    Scene_MenuBase.prototype.update.call(this);
    if(Input.isTriggered('cancel') ){
        SceneManager.goto(Scene_Map);
        SoundManager.playCancel();
    }
    
}
//------------------------------- Sprite_Carta
function Sprite_Carta() {
    this.initialize.apply(this, arguments);
}

Sprite_Carta.prototype = Object.create(Sprite_Base.prototype);
Sprite_Carta.prototype.constructor = Sprite_Carta;

Sprite_Carta.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadPicture('TheMirror');
};


Sprite_Carta.prototype.update = function(){
    Sprite_Base.prototype.update.call(this);
    this.x = 670;
    this.y = 0;
};

Scene_BrCard.prototype.CrearCarta = function (){
    this._carta = new Sprite_Carta();
    this.addChild(this._carta);
};

//-------------------------- Window_CardList

function Window_CardList() {
    this.initialize.apply(this, arguments);
}

Window_CardList.prototype = Object.create(Window_Selectable.prototype);
Window_CardList.prototype.constructor = Window_CardList;

Window_CardList.prototype.initialize = function(x, y, width, height) {
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._category = 'card';
    this._data = [];
};

Window_CardList.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.resetScroll();
    }
};

Window_CardList.prototype.maxCols = function() {
    return 2;
};

Window_CardList.prototype.spacing = function() {
    return 48;
};

Window_CardList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_CardList.prototype.item = function() {
    var index = this.index();
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_CardList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

Window_CardList.prototype.includes = function(item) {
    switch (this._category) {
    case 'item':
        return DataManager.isItem(item) && item.itypeId === 1;
    case 'weapon':
        return DataManager.isWeapon(item);
    case 'armor':
        return DataManager.isArmor(item);
    case 'keyItem':
        return DataManager.isItem(item) && item.itypeId === 2;
    case 'card':
        return DataManager.isItem(item) && item.itypeId === 4;
    default:
        return false;
    }
};

Window_CardList.prototype.needsNumber = function() {
    return true;
};

Window_CardList.prototype.isEnabled = function(item) {
    return $gameParty.canUse(item);
};

Window_CardList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(function(item) {
        return this.includes(item);
    }, this);
    if (this.includes(null)) {
        this._data.push(null);
    }
};

Window_CardList.prototype.selectLast = function() {
    var index = this._data.indexOf($gameParty.lastItem());
    this.select(index >= 0 ? index : 0);
};

Window_CardList.prototype.drawItem = function(index) {
    var item = this._data[index];
    if (item) {
        var numberWidth = this.numberWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.changePaintOpacity(this.isEnabled(item));
        this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
        this.drawItemNumber(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

Window_CardList.prototype.numberWidth = function() {
    return this.textWidth('000');
};

Window_CardList.prototype.drawItemNumber = function(item, x, y, width) {
    if (this.needsNumber()) {
        this.drawText(':', x, y, width - this.textWidth('00'), 'right');
        this.drawText($gameParty.numItems(item), x, y, width, 'right');
    }
};

Window_CardList.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

Window_CardList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};




















