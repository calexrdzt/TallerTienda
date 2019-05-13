

var btns = document.querySelectorAll('.btnimg-1');
  var imgGRande = document.querySelector('.producto__imagen');

  function recorrerBotones(btn, index) {

    console.log("Recorre botones");
    
    function clickBoton(event) {
      
      console.log(imgGRande.style.backgroundImage);
      var url = imgGRande.style.backgroundImage;

      
      console.log(valor);
      var valor = btn.value + "";
      var urlD = url.split('/');
      var urlPunto = urlD[urlD.length - 1].split('.');
      imgGRande.style.backgroundImage = "url(/Imagenes/ImagenesTienda/" + urlPunto[urlPunto.length - 2] + '-' + valor +'.png)';
      imgGRande.style.transition = "0.5s";
      console.log("clickSobreElBoton", urlD[urlD.length - 1], "------------", urlPunto[urlPunto.length - 2]);
    }


    btn.addEventListener('click', clickBoton);
  }

  btns.forEach(recorrerBotones);
