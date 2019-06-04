
//80

Window_Base.prototype.drawIcon = function(iconIndex, x, y, multipleIcon) {
    //iconIndex2 = iconIndex2 || 80;
    var bitmap = ImageManager.loadSystem('IconSet');
    var pw = Window_Base._iconWidth;
    var ph = Window_Base._iconHeight;
           
    if(multipleIcon != undefined){
        multipleIcon.forEach(element => {
            var sx = element % 16 * pw;
            var sy = Math.floor(element / 16) * ph;
            this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
        });
        
    }else{
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
    }  
};

Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();

        //var icon1 = item.meta.icon1 || null;

        this.drawIcon(item.iconIndex, x + 2, y + 2, item.icon);
        this.drawText(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

