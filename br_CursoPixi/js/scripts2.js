window.onload =function(){

        var container = PIXI.Container;
        var autoDetectRenderer = PIXI.autoDetectRenderer;
        var loader = PIXI.Loader.shared;
        var resources = PIXI.Loader.shared.resources;
        var sprite = PIXI.Sprite;
        var TextureCache = PIXI.utils.TextureCache;
        var Texture = PIXI.Texture;

        var stage = new container(); //Caja donde van a estar las cosas q hay q dibujar

        var renderer = autoDetectRenderer(90,90,{ //Crea el lienzo de visualizacion (crea el Canvas), busca q tiene disponible para renderizar WebGL por defecto
            antialias: false,
            transparent: true,
            resolution: 1
        });

        document.body.appendChild(renderer.view);
        //renderer.view.style.border = "4px solid red";
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
        renderer.autoDensity = true; //autoSize
        renderer.resize(window.innerWidth, window.innerHeight);
        
        loader
            .add("images/mitileset.png")
            .load(setup);
        
        function setup(){     
          
            var puerta = new sprite(
                Frama("images/mitileset.png", 48, 192, 48, 48)
            );
            puerta.position.set(90, 90);

            stage.addChild(puerta);
            renderer.render(stage);
        }

        function Frama(pOrigen, x, y, width, height){
            var textura, marcoImagen
            if( typeof pOrigen === "string" ){
                if( TextureCache[pOrigen] ){
                    textura = new Texture( TextureCache[pOrigen] );
                }
            }else if(pOrigen instanceof Texture){
                textura = new Texture(pOrigen);
            }
            if(!textura){
                console.log("La textura no esta");
            }else{
                marcoImagen = new PIXI.Rectangle(x, y, width, height);
                textura.frame = marcoImagen;
                return textura;

            }
        }
    
}

/*
    stage.removeChild(casco);   //Borra el sprite q queremos remover (ej. casco)
    casco.visible = false;      //Hace invisible el sprite q queremos remover (ej. casco)
    casco.destroy(true, true);  //Borra el sprite q queremos remover (ej. casco) - destroy(Textura, TexturaBase)

    casco.width = 96;
    casco.height = casco.height * 3;

    casco.scale.x = 3;   //scala en x *3
    casco.scale.y = 3;
    casco.scale.set(2, 3);  (x, Y)

    casco.x = 96;
    casco.Y = 96;
    casco.position.set(96, 96);  //set(x, y)
*/

/*
        loader
            .add("images/casco1.png")
            .load(setup);
        
        function setup(){
            var Vtexture = resources["images/casco1.png"].texture;
            var casco = new sprite(Vtexture);

            casco.position.set(96, 96);  //set(x, y)
            casco.scale.set(2, 3);
            

            stage.addChild(casco);
            renderer.render(stage); //dibuja lo q esta dentro de stage

        }
*/

/*
function setup(){     
            var textura = TextureCache["images/mitileset.png"];
            var miTile = new PIXI.Rectangle(48, 192, 48, 48);  //(x, y, width, height)  
            textura.frame = miTile; //corta la imagen a lo q abarca "miTile"         

            var puerta = new sprite(textura);
            puerta.position.set(90, 90);

            stage.addChild(puerta);
            renderer.render(stage);
        }
 */