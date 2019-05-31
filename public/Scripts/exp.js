var canvas = document.getElementById("renderCanvas");


new p5(function (app) {

    var sound;
    var sound2;

    app.preload = function () {
        // initialize sound
        sound = app.loadSound('SonidoSin.mp3');
        sound2 = app.loadSound('SonidoCon.mp3');
        sound.pan(0);
        sound2.pan(0);

    }

    app.setup = function () {

       // sound.play();
        console.log(sound.pan + "hhhh");
    }

    var createScene = function () {
        var scene = new BABYLON.Scene(engine);
        //   scene.clearColor = new BABYLON.Color3(255, 0, 0);

        var background = new BABYLON.Layer("back", "/Imagenes/ImagenesTienda/FondoExp.png", scene);
        background.isBackground = true;
        background.texture.level = 0;
        background.texture.wAng = 0;

        //Adding a light
        var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(20, 10, 100), scene);

        //Adding an Arc Rotate Camera
        var camera = new BABYLON.ArcRotateCamera("Camera", 1.5, 1.5, 150, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, false);
       


        // The first parameter can be used to specify which mesh to import. Here we import all meshes
        BABYLON.SceneLoader.ImportMesh("", "/scenes/", "Geishamasks.obj", scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            camera.target = newMeshes[1];
        });

        // Move the light with the camera
        scene.registerBeforeRender(function () {
            light.position = camera.position;
            //  sound.pan(camera.position.x/10);
        });


        /*
        var manager = new BABYLON.GUI.GUI3DManager(scene);
    
        var button = new BABYLON.GUI.HolographicButton("down");
        manager.addControl(button);
      //  button.linkToTransformNode(anchor);
    
        button.cornerRadius= 10;
    
        button.position.z = 1;
        button.position.x = -40;
    
        button.text = "cambiar";
        button.imageUrl = "/Imagenes/b_azul.png";
        button.onPointerUpObservable.add(function(){
            donut.rotation.x -= 0.05;
        });
    
    
    */


        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        //Boton numero 1
        var button = BABYLON.GUI.Button.CreateSimpleButton("but", "Con Beats");
        button.width = "180px";
        button.left = 480;
     //   button.top = 190;
        button.fontSize = "25px";
        button.cornerRadius = 120;
        button.height = "80px";
        button.color = "white";
        button.hoverCursor = "pointer";
        button.hoverColor = "red";
        button.background = "transparent";


        button.onPointerUpObservable.add(function () {
            sound.stop();
            sound2.play();
            sound2.pan(camera.alpha);

            function cambiar(){
                if(2<=camera.alpha<=1){
                    sound2.pan(0);
                    sound.pan(0);
                }
                
                if(3<=camera.alpha<=2){
                    sound2.pan((-camera.alpha+2));
                    sound.pan((-camera.alpha+2));
                }
                
                if(0<=camera.alpha<=1){
                    sound2.pan((-camera.alpha+1));
                    sound.pan((-camera.alpha+1));
                }
                
                console.log("izquierda" + (-camera.alpha+2));
               

            }

            document.addEventListener('click',cambiar);
        });

        advancedTexture.addControl(button);


        //Boton numero 1
        var sin = BABYLON.GUI.Button.CreateSimpleButton("but", "Sin Beats");
        sin.width = "180px";
        sin.left = -480;
        sin.fontSize = "25px";
      //  sin.top = 190;
        sin.cornerRadius = 80;
        sin.height = "80px";
        sin.color = "white";
        sin.hoverCursor = "pointer";
        sin.hoverColor = "red";
        sin.background = "transparent";

        sin.onPointerUpObservable.add(function () {
            sound2.stop();
            sound.play();
            function cambiar(){
                if(2<=camera.alpha<=1){
                    sound2.pan(0);
                    sound.pan(0);
                }
                
                if(3<=camera.alpha<=2){
                    sound2.pan((-camera.alpha+2));
                    sound.pan((-camera.alpha+2));
                }
                
                if(0<=camera.alpha<=1){
                    sound2.pan((-camera.alpha+1));
                    sound.pan((-camera.alpha+1));
                }
                
                console.log("izquierda" + (-camera.alpha+2));
               

            }

            document.addEventListener('click',cambiar);


        });

        advancedTexture.addControl(sin);


        var texto = new BABYLON.GUI.TextBlock();
        texto.text = "Usa tus Beats";
        texto.color = "white";
        texto.fontSize = 35;
        texto.fontFamily = 'Gilroy';    
        texto.top = -260;
        advancedTexture.addControl(texto);






        return scene;


    }


    var engine = new BABYLON.Engine(canvas, true,
        { preserveDrawingBuffer: true, stencil: true });
    var scene = createScene();

    engine.runRenderLoop(function () {
        if (scene) {
            scene.render();
        }
    });

    // Resize
    window.addEventListener("resize", function () {
        engine.resize();
    });


    //utilzar el add event listener para que funcione el otro sonido, cargarlo tambien espero que funcione :ccccccc






});


