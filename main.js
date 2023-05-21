//Variables globales para el juego
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let aciertos = 0;
let temporizador = false;
let timer = 180;
let tiemporegresivo = null;
let points = 0;
const tabla = document.getElementById("tabla-puntuaciones");

//tabla de ganadores
function agregarUsuario(nombreUsuario, puntuacion) {
    const nuevaFila = document.createElement("tr");
    const celdaUsuario = document.createElement("td");
    const celdaPuntuacion = document.createElement("td");
    celdaUsuario.textContent = nombreUsuario;
    celdaPuntuacion.textContent = puntuacion;
    nuevaFila.appendChild(celdaUsuario);
    nuevaFila.appendChild(celdaPuntuacion);
    tabla.appendChild(nuevaFila);
  
    ordenarTabla();
  }
  function ordenarTabla() {
    const filas = tabla.getElementsByTagName("tr");
    const arrayFilas = Array.from(filas).slice(1); // Ignora la fila de encabezado
  
    arrayFilas.sort((a, b) => {
      const puntuacionA = parseInt(a.getElementsByTagName("td")[1].textContent);
      const puntuacionB = parseInt(b.getElementsByTagName("td")[1].textContent);
      return puntuacionB - puntuacionA;
    });
  
    arrayFilas.forEach((fila) => tabla.appendChild(fila));
}

//logica de aparicion de las 16 fotos 
let numeros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);
//mostar cosas 
let mostarAciertos = document.getElementById("aciertos");
let mostarTiempo = document.getElementById("t restante");
let mostrarPuntos = document.getElementById("puntuacion");
window.addEventListener(cargarTabla());




//funciones utiles 
function contarTiempo(){
    tiemporegresivo = setInterval(() =>{
        timer--;
        mostarTiempo.innerHTML = `tiempo ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiemporegresivo);
            bloquearTarjetas();
        }
    },1000)
}
function cargarTabla() {
    const tablaString = localStorage.getItem("tabla-puntuaciones");
    if (tablaString) {
      const tablaJson = JSON.parse(tablaString);
  
      tablaJson.forEach((fila) => {
        const nuevaFila = document.createElement("tr");
        const usuario = document.createElement("td");
        const puntuacion = document.createElement("td");
  
        usuario.textContent = fila.usuario;
        puntuacion.textContent = fila.puntuacion;
  
        nuevaFila.appendChild(usuario);
        nuevaFila.appendChild(puntuacion);
        tabla.appendChild(nuevaFila);
      });
  
      console.log("Tabla cargada desde el localStorage.");
    }
  }
function bloquearTarjetas(){
    for(let i = 0;i<=15;i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./${numeros[i]}.jpg" alt="">`;
        tarjetaBloqueada.disabled = true;
        mostrarPuntos.innerHTML = `Tu score fue de 0 puntos`


    }
}
//funcion para reiniciar el juego, guardando todo y empezando de 0 
function reiniciar(){
    numeros = numeros.sort(()=>{return Math.random()-0.5});
    timer = 180;
    for(let i = 0;i<=15;i++){
        let tarjetaReiniciada = document.getElementById(i);
        tarjetaReiniciada.innerHTML = "";
        tarjetaReiniciada.disabled = false;
}       tarjetasDestapadas = 0;
        let user = document.getElementById("usuario").value;
        agregarUsuario(user, points);//Poner el usuario en la tabla




        //Guardar tabla en el local storage 
        const filas = tabla.getElementsByTagName("tr");
        const arrayFilas = Array.from(filas).slice(1); // Ignora la fila de encabezado
        const tablaJson = arrayFilas.map((fila) => {
          const usuario = fila.getElementsByTagName("td")[0].textContent;
          const puntuacion = fila.getElementsByTagName("td")[1].textContent;
          return { usuario, puntuacion };
        });
        const tablaString = JSON.stringify(tablaJson);
        localStorage.setItem("tabla-puntuaciones", tablaString);
        console.log("Tabla guardada en el localStorage.");
        //cargar el local storage 
        const tablastring = localStorage.getItem("tabla-puntuaciones");
        if (tablastring) {
          const tablaJson = JSON.parse(tablastring);
      
          tablaJson.forEach((fila) => {
            const nuevaFila = document.createElement("tr");
            const usuario = document.createElement("td");
            const puntuacion = document.createElement("td");
      
            usuario.textContent = fila.usuario;
            puntuacion.textContent = fila.puntuacion;
      
            nuevaFila.appendChild(usuario);
            nuevaFila.appendChild(puntuacion);
            tabla.appendChild(nuevaFila);
          });
      
          console.log("Tabla cargada desde el localStorage.");
        }
        //termina local storage
        //reinicio de las cosas 
        timer = 180;
        aciertos=0;
        mostarAciertos.innerHTML = `Aciertos:${aciertos}`;
        points = 0;
        mostrarPuntos.innerHTML = `Puntuacion:0`
}
//funcion para destapar las caras del juego 
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;

    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);
    if(tarjetasDestapadas == 1){
        //mostrar cara 1 
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./${primerResultado}.jpg" alt="">`;
        tarjeta1.disabled = true; 
    }else if(tarjetasDestapadas == 2){
        //mostrar cara 2 
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./${segundoResultado}.jpg" alt="">`;
        tarjeta2.disabled = true;
        if(primerResultado == segundoResultado){
            //Resultado ganador 
            tarjetasDestapadas = 0;
            aciertos++;
            mostarAciertos.innerHTML = `Aciertos:${aciertos}`;
            if(aciertos == 8){
                clearInterval(tiemporegresivo)
               mostarAciertos.innerHTML = `Aciertos:${aciertos} ---> 
                      Haz ganado `
                points = aciertos * Math.round(180/(180-timer));
                mostarTiempo.innerHTML = `Tu tiempo fue de ${180 - timer} segundos`
                mostrarPuntos.innerHTML = `Tu score fue de ${aciertos * Math.round(180/(180-timer))} puntos`
            

            }
        }else{
            //Resultado perdedor 
            setTimeout(() => {
                tarjeta1.innerHTML = "";
                tarjeta2.innerHTML ="";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },500);
        }  


    }
}

