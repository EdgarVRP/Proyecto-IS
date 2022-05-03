//alert("El script validacion aun funciona")

var Filtro1=/[0-9.0-9]+[0-9;0-9]+/g;
var Filtro2=/[0-9.0-9]+[0-9 0-9]+/g;
var Filtro3=/[0-9.0-9]+[0-9,0-9]+/g;
var Filtro4=/[0-9,0-9]+[0-9;0-9]+/g;
var Filtro5=/[0-9,0-9]+[0-9 0-9]+/g;
var filtrado="";
/*
var numero="1.1 2.2 3.3 4.4 5.5 6.6";
var seleccion=2;
*/
var numero="";
var seleccion=0;
var union="";
var archivo="";
var extension="";
var Filtro6=/[0-9,0-9]+/g;
var Filtro7=/[0-9.0-9]+/g;
var TipoNumero=[];
var Filtrado2=0;
var Media=0;
var varianza=0;
var Desviacion=0;
var CoefVar=0;
var arrayOrd=0;
var stop=false;
class Verificacion{
	constructor(numero,seleccion){
		this.numero=numero;
		this.seleccion=seleccion;
	}

	FiltroAutilizar(){
		filtrado=""
		//Del string original se guardan a una nueva variable contemplando lo seleccionado de separacion decimal y de numero
		switch(seleccion){
			case 5: //Separación decimal: punto Separación Numeros: punto y coma
			filtrado=numero.match(Filtro1);
			if (filtrado==null) {
				filtrado=""
			}else{
			}
			break;
			case 6: //Separación decimal: punto Separación Numeros: espacio
			filtrado=numero.match(Filtro2);
			if (filtrado==null) {
				filtrado=""
			}
			break;
			case 7: //Separación decimal: punto Separación Numeros: coma
			filtrado=numero.match(Filtro3);
			if (filtrado==null) {
				filtrado=""
			}
			break;
			case 9: //Separación decimal: coma Separación Numeros: punto y coma
			filtrado=numero.match(Filtro4);
			if (filtrado==null) {
				filtrado=""
			}
			break;
			case 10: //Separación decimal: coma Separación Numeros: espacio
			filtrado=numero.match(Filtro5);
			if (filtrado==null) {
				filtrado=""
			}
			break;
			default: //Funcion Error Seleccion
			stop=true;
			break;
		}
	}
	Verificando(filtrado){
		union="";
		//Se rearma la cadena con los filtros seleccionados
		for (var i = 0; i <filtrado.length; i++) {
			union=union+filtrado[i];
		}
		if (numero=="") {//El usuario no ingreso datos
			alert("No hay numeros");
			stop=true;
		}
		if (union==numero) {
			//alert("Los numeros estan ingresados correctamente");
		}else{
			alert("Los numeros fueron ingresados incorrectamente");
			stop=true;
		}
	}
	ArchivoV(archivo){
		extension="";
		for (var i = archivo.length-4; i <archivo.length; i++) {
			extension=extension+archivo[i];
		}
		//alert("La extension del archivo es: "+extension)
		if (extension==".txt") {
		return true;
		}else{
			stop=true;
			alert("La extension del archivo es: "+extension+" cargue un archivo tipo .txt")
			return false;
		}
	}
	//Funcion para pasar txt a string, por verificar...
	FileToString(e){
		var archivo = e.target.files[0];
		if (!archivo) {
			return;
		}
		var lector = new FileReader();
		lector.onload = function(e) {
			var contenido = e.target.result;
			mostrarContenido(contenido);
		};
		lector.readAsText(archivo);
	}
	ConversionANumero(){
		Filtrado2=0
		TipoNumero=[];
		if ((seleccion==9)||(seleccion==10)) {
			Filtrado2=numero.match(Filtro6);
			for (var i = 0; i <Filtrado2.length; i++) {
				Filtrado2[i]=Filtrado2[i].replace(/,/g,".");
				TipoNumero.push(parseFloat(Filtrado2[i]));
			}
		}else{
			Filtrado2=numero.match(Filtro7);
			for (var i = 0; i <Filtrado2.length; i++) {
				TipoNumero.push(parseFloat(Filtrado2[i]));
			}
		}
	}
	MediaAritmetica(ConjuntoNumeros){
		Media=0;
		for (var i =0; i < ConjuntoNumeros.length; i++) {
			Media=ConjuntoNumeros[i]+Media;
		}
		Media=Media/ConjuntoNumeros.length;
		//alert(Media);
		return Media;
	}
	DesviacionEstandar(ConjuntoNumeros2,Media){
		varianza=0;
		Desviacion=0;
		var Temp=0;
		for (var i =0; i < ConjuntoNumeros2.length; i++) {
			Temp=Temp+Math.pow((ConjuntoNumeros2[i]-Media),2);
		}
		varianza=Temp/(ConjuntoNumeros2.length-1);
		//alert("La varianza es: "+ varianza);
		document.getElementById('disabledTexr7').placeholder=varianza.toFixed(4);
		Desviacion=Math.sqrt(varianza);
		//alert("La Desviacion Estandar es: "+ Desviacion);
		document.getElementById('estandar').placeholder=Desviacion.toFixed(4);
	}
}
function ConocerSeleccionUsuario(){//Metodo para dar lectura a los radiobuttons seleccionados por el usuario
/*
Seleccion:
5:Separación decimal: +4punto Separación Numeros: +1punto y coma
6:Separación decimal: +4punto Separación Numeros: +2espacio
7:Separación decimal: +4punto Separación Numeros: +3coma
9:Separación decimal: +8coma Separación Numeros: +1punto y coma
10:Separación decimal: +8coma Separación Numeros: +2espacio
*/
	seleccion=0;
	var SeparacionDecimal = document.getElementsByName("decimal");
	var SeparacionNumeros = document.getElementsByName("numero");
	if (SeparacionNumeros[0].checked) {//El usuario selecciono separacion Numerica por punto y coma
		seleccion=seleccion+1;
	}
	if (SeparacionNumeros[1].checked) {//El usuario selecciono separacion Numerica por coma
		seleccion=seleccion+3;
	}
	if (SeparacionNumeros[2].checked) {//El usuario selecciono separacion Numerica por Espacio
		seleccion=seleccion+2;
	}
	if (SeparacionDecimal[0].checked) {//El usuario selecciono separacion decimal por punto
		seleccion=seleccion+4;
	}
	if (SeparacionDecimal[1].checked) {//El usuario selecciono separacion decimal por coma
		seleccion=seleccion+8;
	}
}

function CoeficienteDVariacion() {
  CoefVar=0
  CoefVar = Desviacion / Media;
  //alert("Coeficiente de Variacion es: "+ CoefVar);
  document.getElementById('disabledTexr1').placeholder=CoefVar.toFixed(4);
}
function odenar (number){
  var numOrg;
  numOrg = number.sort(function (prev, next) {
    return prev- next;
  });
  return numOrg;
}
//funcion de rango
 function rango (){
   var rango;
   var total_de_num;
   //llamada a la function rango
   var arrayOrd = odenar(TipoNumero);
   total_de_num = arrayOrd.length;
   rango = arrayOrd[total_de_num -1] - arrayOrd[0];
  //alert("El Rango es: "+ rango);
  document.getElementById('rango').placeholder=rango.toFixed(4);
}

function OperacionYValidacion(){
	var start = performance.now(); //anadido tiempo
numero="";
seleccion=0;
const verificacion1= new Verificacion(); //Se crea el objeto Verificacion

if (document.getElementById("numero").value=="") {
	//alert("Se intentara leer .TXT");
	var TipoArchivo=verificacion1.ArchivoV(document.getElementById('subir').value); //Se verifica que el archivo ingresado tenga la extension correcta boolean
	numero=document.getElementById('contenidoA').innerHTML;
	//alert(document.getElementById('subir').value); //extension del archivo
}else{
	numero=document.getElementById("numero").value;	
}
numero=numero.replace(/(\r|\t|\n|\n|\r)/gm, "");  //Se eliminan saltos de linea
ConocerSeleccionUsuario();
//alert(seleccion);
if (seleccion==11) {
	alert("Usted selecciono como separacion decimal y numerica el caracter coma (,)");
}
if (seleccion==0) {
	alert("Usted no selecciono ninguna opcion de separacion decimal y numerica");
}
if ((seleccion==4)||(seleccion==8)) {
	alert("Usted no selecciono la opcion de Separación entre numeros");
}
if ((seleccion<11)&&(seleccion>4)&&(seleccion!=8)) {
	//alert("Se continua ejecutando");
	//const verificacion1= new Verificacion(numero,seleccion);
	verificacion1.FiltroAutilizar();//Se crea una nueva variable de comparacion con la separacion decimal y numerica indicada por el usuario
	verificacion1.Verificando(filtrado);//Se verifica que sea correcta la seleccion por el usuario y lo ingresado
	seleccion=0;
	if (stop==false) {
		//alert("Se continua ejecutando 2");
		verificacion1.ConversionANumero(); //Se convierte a un array float la cadena string
		//verificacion1.MediaAritmetica(TipoNumero);
		verificacion1.DesviacionEstandar(TipoNumero,verificacion1.MediaAritmetica(TipoNumero));
		CoeficienteDVariacion();
		rango (arrayOrd);
	}
stop=false;
}

var end   = performance.now();
 
alert(end-start);
}
