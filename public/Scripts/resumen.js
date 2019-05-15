window.addEventListener('load', function(){
    var form = document.querySelector('form');
    function enviarProductos(evento){
        //evento.preventDefault();
        console.log('hola');

        var input = document.querySelector('.input-productos');
        input.value = localStorage.getItem('listaProductos');

        localStorage.removeItem('listaProductos');
    }
    form.addEventListener('submit', enviarProductos);
});

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
    }
  }