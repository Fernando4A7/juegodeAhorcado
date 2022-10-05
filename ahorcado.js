var ctx;
var canvas;
var palabra;
var letras = "QWERTYUIOPASDFGHJKLÑZXCVBNM";
var colorTecla = "#585858";
var colorMargen ="red";
var inicioX = 200;
var inicioY = 300;
var lon = 35;
var margen = 20;
var pistaText = "";

var teclas_array = new Array();
var letras_array = new Array();
var palabras_array = new Array();

var aciertos = 0;
var errores = 0;


palabras_array.push("LEON");
palabras_array.push("CABALLO");
palabras_array.push("PERRO");
palabras_array.push("GATO");
palabras_array.push("LAGARTIJA");
palabras_array.push("RINOCERONTE");
palabras_array.push("TIBURON");
palabras_array.push("CARACOL");
palabras_array.push("ALACRAN");
palabras_array.push("ARAÑA");
palabras_array.push("CHAPULIN");
palabras_array.push("AVESTRUZ");
palabras_array.push("OCELOTE");
palabras_array.push("MUSARAÑA");
palabras_array.push("AGUILA");


function Tecla(x, y, ancho, alto, letra){
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.alto = alto;
	this.letra = letra;
	this.dibuja = dibujaTecla;
}

function Letra(x, y, ancho, alto, letra){
	this.x = x;
	this.y = y;
	this.ancho = ancho;
	this.alto = alto;
	this.letra = letra;
	this.dibuja = dibujaCajaLetra;
	this.dibujaLetra = dibujaLetraLetra;
}


/*dibujar teclas*/
function dibujaTecla(){
	ctx.fillStyle = colorTecla;
	ctx.strokeStyle = colorMargen;
	ctx.fillRect(this.x, this.y, this.ancho, this.alto);
	ctx.strokeRect(this.x, this.y, this.ancho, this.alto);

	ctx.fillStyle = "white";
	ctx.font = "bold 20px courier";
	ctx.fillText(this.letra, this.x+this.ancho/2-5, this.y+this.alto/2+5);
}

function dibujaLetraLetra(){
	var w = this.ancho;
	var h = this.alto;
	ctx.fillStyle = "black";
	ctx.font = "bold 40px courier";
	ctx.fillText(this.letra, this.x+w/2-12, this.y+h/2+14);
}
function dibujaCajaLetra(){
	ctx.fillStyle = "white";
	ctx.strokeStyle = "black";
	ctx.fillRect(this.x, this.y, this.ancho, this.alto);
	ctx.strokeRect(this.x, this.y, this.ancho, this.alto);
}

/*funcion para dar una pista al usuario*/
function pistaFunction(palabra){
	let pista = ""; // se crea la variable local pista que contendra nuestra frase de pista
	switch(palabra){ // se crea un switch para poder controlar las pistas segun la palabra
		case 'LEON': // se deve de hacer un case para cada palabra 
		    pista = "Ruge y es fuerte";
		    break; //es importante el break en cada case
	    case 'CABALLO':
	        pista = "Hay de tierra y hay de mar";
	        break;
	    case 'PERRO':
	        pista = "El mejor amigo del hombre";
	        break;
	    case 'GATO':
	        pista = "Son tiernos pero arañan";
	        break;
	    default: /*El default se puede omitir*/
	        pista = "NO hay pista aun xP";

	}
	//pintamos la palabra en el canvas, en este ejemplo se pinta arriba a la izquierda //
	ctx.fillStyle = "black"; //aqui ponemos el color de la letra 
	ctx.font = "bold 20px courier"; // El tipo y el tamaño de la letra*/
	ctx.fillText(pista, 10, 15); // es para poner la frase en nuestro caso la variable pista, seguido de la posx y posy
}
/*distribuidor nuestro teclado con sus letras  respectivas al acomodo de nuestro array*/

function teclado(){
	var ren = 0;
	var col =0;
	var letra = "";
	var miLetra;
	var x = inicioX;
	var y = inicioY;
	for(var i = 0; i < letras.length; i++){
		letra = letras.substr(i, 1);
		miLetra = new Tecla(x, y, lon, lon, letra);
		miLetra.dibuja();
		teclas_array.push(miLetra);
		x += lon + margen;
		col ++;
		if(col==10){
			col =0;
			ren++;
			if(ren==2){
				x = 280;
			} else {
				x = inicioX;
			}
		}
		y = inicioY + ren * 50;
	}
}
/* aqui obtenemos nuestra palabra aleatoriamente y la dividimos en letras*/
function pintaPalabra(){
	var p = Math.floor(Math.random()*palabras_array.length);
	palabra = palabras_array[p];

	pistaFunction(palabra);

	var w = canvas.width;
	var len = palabra.length;
	var ren = 0;
	var col = 0;
	var y = 230;
	var lon = 50;
	var x = (w - (lon+margen) *len)/2;
	for(var i=0; i<palabra.length; i++){
		letra = palabra.substr(i,1);
		miLetra = new Letra(x, y, lon, lon, letra);
		miLetra.dibuja();
		letras_array.push(miLetra);
		x += lon + margen;
	}
}

function horca(errores){
	var imagen = new Image();
	imagen.src = "imagenes/ahorcado"+errores+".png";
	imagen.onload = function(){
		ctx.drawImage(imagen, 390, 0, 230, 230);
	}
	
}

function ajusta(xx, yy){
	var posCanvas = canvas.getBoundingClientRect();
	var x = xx-posCanvas.left;
	var y = yy-posCanvas.top;
	return{x:x, y:y}
}
/* detecta tecla clickeada y la compara con las de la palabra ya elegida al azar*/
function selecciona(e){
	var pos = ajusta(e.clientX, e.clientY);
	var x = pos.x;
	var y = pos.y;
	var tecla;
	var bandera = false;
	for (var i = 0; i <teclas_array.length; i++){
		tecla = teclas_array[i];
		if (tecla.x > 0){
			if ((x > tecla.x) && (x < tecla.x + tecla.ancho) &&(y > tecla.y) &&(y < tecla.y + tecla.alto)){
				break;
			}
		}
	} 
	if (i < teclas_array.length){
		for (var i = 0; i < palabra.length; i++){
			letra = palabra.substr(i, 1);
			if ( letra == tecla.letra){ /*comparamos y vemos si acerto la letra */
			    caja = letras_array[i];
			    caja.dibujaLetra();
			    aciertos++;
			    bandera = true;
			}
		}
		if (bandera == false){ /* Si falla aumenta los errores y checa si perdio para mandar ala funcion gameover*/
			errores++;
			horca(errores);
			if (errores == 5) gameOver(errores);
		}
		/* Borra la tecla que se presiona */
		ctx.clearRect(tecla.x - 1, tecla.y - 1, tecla.ancho + 2, tecla.alto + 2);
		tecla.x - 1;
		/* checa si se gano y manda ala funcion gameover*/
		if (aciertos == palabra.length) gameOver(errores);
	}
} 
/* borramos las teclas y la palabra con sus cajas y mandamos msj segun el caso si se gano o se perdio */
function gameOver(errores){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "black";

	ctx.font = "bold 50px courier";
	if (errores < 5){
		ctx.fillText("Muy bien, la palabra es: ", 110,280);
	} else{
		ctx.fillText("Lo sentimos, la palabra era: ", 110, 280);
	}
	ctx.font = "bold 80px courier";
	lon = (canvas.width - (palabra.length*48))/2;
	ctx.fillText(palabra, lon, 380);
	horca(errores);
}
/* detectar si se a cargado nuestro contexto en el canvas, iniciamos las funciones necesarias  para jugar o se le manda msj de error segun sea el caso*/
window.onload = function(){
	canvas = document.getElementById("pantalla");
	if (canvas && canvas.getContext){
		ctx = canvas.getContext("2d");
		if(ctx){
			teclado();
			pintaPalabra();
			horca(errores);
			canvas.addEventListener("click", selecciona, false);
		} else {
			alert ( "!Error al cargar el contexto!");
		}
	}
}
