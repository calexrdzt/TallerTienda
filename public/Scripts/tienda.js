
  /*
  var flecha = document.querySelector('.flecha');
  var filtros = document.querySelector('.encabezado__filtro');
  var encabezado = document.querySelector('.encabezado');

  var activo = true;
  var click = false;

  function mostrarFiltros(){

      
      if(activo === false){
        filtros.style.display = 'flex';
        activo = true;
        click = true;
        console.log(filtros.style.display);
      }
      else if (activo === true || click === false){
        filtros.style.display = 'none';
        activo=false;
        console.log(filtros.style.display);
      }

      console.log(activo);
    
  }

  flecha.addEventListener('click',mostrarFiltros);
*/

 var titulo = document.querySelector('.encabezado__titulo');
 var hambur = document.querySelector('.encabezado__hambur');
 var filtrar = document.querySelector('.encabezado__filtrar');
 var filtros = document.querySelectorAll('.encabezado__filtro-imgs');

 
  var activo = false;

  function menuHamburguesa() {

    var click = false;
    if(filtrar.style.width <'50%' ){
      if (activo === false) {
        titulo.style.paddingTop = '70px';
        filtros.forEach(fil => {
          fil.style.display = 'block';
          fil.style.transitio = '0.5s';
        });
        
        console.log("opciones");
        activo = true;
        click = true;
  
      } else if (activo === true || click === false) {
        filtros.forEach(fil => {
          fil.style.display = 'none';
        });
        activo = false;
      }
    }

    

  }filtrar.addEventListener('click',menuHamburguesa);


  var nav =document.querySelector('.nav');

  window.onscroll = function (){
    if(window.pageYOffset > 10){
      nav.style.position = 'fixed';
      nav.style.top = 0;
      nav.style.backgroundColor = 'rgb(165, 2, 1)';
      nav.style.transition = '0.5s';
    }else {
      nav.style.position = 'absolute';
      nav.style.top = 10;
      nav.style.backgroundColor = 'transparent';
    }
  }

  ScrollReveal().reveal('tienda__producto', { interval: 200 });
  ScrollReveal().reveal('encabezado__titulo');
