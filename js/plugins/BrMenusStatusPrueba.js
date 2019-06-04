Window_MenuStatus.prototype.numVisibleRows = function(){
    return 1;  
};

Window_MenuStatus.prototype.maxCols = function(){
    return 4;  
};

Window_MenuStatus.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x; // + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    //var width = rect.width - x - this.textPadding();
    //this.drawActorSimpleStatus(actor, x, y, width);
    var lineHeight = this.lineHeight();
    //var x2 = x + 180;
    var width2 = 150;//Math.min(200, width - 180 - this.textPadding());
    this.drawActorName(actor, x, y - lineHeight * 5 );
    this.drawActorLevel(actor, x, y - lineHeight * 3);
    this.drawActorIcons(actor, x, y - lineHeight * 2);
    this.drawActorClass(actor, x, y - lineHeight * 4);
    this.drawActorHp(actor, x, y + lineHeight * 3, width2);
    this.drawActorMp(actor, x, y + lineHeight * 4, width2);
};
