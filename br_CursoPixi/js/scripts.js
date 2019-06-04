const app = new PIXI.Application();

window.onload = function(){
    document.body.appendChild(app.view);
    var casco = PIXI.Sprite.from('images/casco1.png');
    
    casco.interactive = true;   //Hace q se pueda interactuar con el    
    //casco.buttonMode = true;  //hace q cambie l puntero
    casco.anchor.set(0.5); //ni idea q hace
    casco.x = 0;
    casco.y = 50;            
    app.stage.addChild(casco);

    const onDragStart = event => {
        casco.data = event.data;
        casco.dragging = true;
    }
    const onDragEnd = event => {
        delete casco.data;
        casco.draggin = false;           
    }
    const onDragMove = event => {
        
        if(casco.dragging === true){
            var newPosition = casco.data.getLocalPosition(casco.parent);
            casco.x = newPosition.x;
            casco.y = newPosition.y;            
        }
    }

    casco.on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);    

    

    let left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    casco.vx = 0 ;
    right.press = function(){
        casco.vx += 2;
    }

    right.release = () => {
        if (!left.isDown && casco.vy === 0) {
            casco.vx = 0;
        }
      };

    left.press = function(){
        casco.vx -= 2;
    }

    app.ticker.add(function(delta){        
        casco.x += casco.vx;
        // if(casco.x >= 800){
        //     casco.x = 0;
        // }
            
        // if(casco.x <= 0)
        //     casco.x =  800;
    });
}

function keyboard(value) {
    let key = {};
    key.value = value;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
      if (event.key === key.value) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    };
  
    //The `upHandler`
    key.upHandler = event => {
      if (event.key === key.value) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    };
  
    //Attach event listeners
    const downListener = key.downHandler.bind(key);
    const upListener = key.upHandler.bind(key);
    
    window.addEventListener(
      "keydown", downListener, false
    );
    window.addEventListener(
      "keyup", upListener, false
    );
    
    // Detach event listeners
    key.unsubscribe = () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
    
    return key;
  }


/*  
    casco.interactive = true;
    casco.buttonMode = true;
    casco.anchor.set(0.5); //ni idea q hace
    casco.x = 50;
    casco.y = 50;    
    app.stage.addChild(casco);

    casco.on('click', function(){
        this.x += 50;
        if(this.x >= 800){
            this.x -= 500;
        }
    });
*/