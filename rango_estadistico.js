var number= document.getElementById('numero');
var calcular= document.getElementById('calcular');
//var number = [2, 34, 10, 2, 5.1, 1];
calcular.onclick= function(e){
    var arrayOrd;
    rango (arrayOrd);
    //funcion
    //funcion de ordenar
    function odenar (number){
      var arrayOrd;
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
       arrayOrd = odenar(number);
       total_de_num = arrayOrd.length;
       rango = arrayOrd[total_de_num -1] - arrayOrd[0];
      console .log(rango);
      alert(rango);
    }
    
}
