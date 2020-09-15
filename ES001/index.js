"use strict";

var _imgUtente, _imgComputer, _mins;
var _txtUtente, _btnGioca, _txtRisultato;

window.onload=function()
{
    _imgUtente=document.getElementById("imgUtente");
    _imgComputer=document.getElementById("imgComputer");
    _imgUtente.style.backgroundImage="url(img/vuota.png)";
    _imgComputer.style.backgroundImage="url(img/vuota.png)";
	
    _mins=document.getElementsByClassName("min");
    _mins[0].style.backgroundImage="url(img/mano.png)";
    _mins[1].style.backgroundImage="url(img/sasso.png)";
    _mins[2].style.backgroundImage="url(img/forbice.png)";
	
    for(var i=0; i<_mins.length; i++){
		_mins[i].indice=i;
        _mins[i].addEventListener("click", visualizza);
	}
		
	_txtUtente=document.getElementById("txtUtente");
    _btnGioca=document.getElementById("btnGioca");
	_txtRisultato=document.getElementById("txtRisultato");
	_btnGioca.addEventListener("click",gioca);
};


function visualizza()
{
    imgUtente.style.backgroundImage=this.style.backgroundImage;
}


function gioca()
{
	console.log(_imgUtente.style.backgroundImage)
    if(_txtUtente.value=="")
        alert("inserire nome");
    else if(_imgUtente.style.backgroundImage=='url("img/vuota.png")')
        console.log("scegli una carta");
    else {
		// carta utente
		let len = _imgUtente.style.backgroundImage.length;
		//console.log("--" + _imgUtente.style.backgroundImage + " - " + len);
		//SUBSTRING -> TRA IL PUNTO SUCCESSIVO A url("img/ LUNGO 9 E .png") CHE E' LUNGO 6
		let cartaUtente = _imgUtente.style.backgroundImage.substring(9, len-6);
		console.log("Carta utente: "+ cartaUtente);
		
        // carta Computer
		let cartaPC;
		do{
			var n=random(1,3);
			switch(n){
				case 1: cartaPC="mano"; break;
				case 2: cartaPC="sasso"; break;
				case 3: cartaPC="forbice"; break;
			}
		}while(cartaPC == cartaUtente);
        imgComputer.style.backgroundImage = "url(img/"+cartaPC+".png)";

		console.log("Carta pc: "+ cartaPC);

  
		if(cartaUtente=="sasso"){
			if(cartaPC=="mano")
				_txtRisultato.innerHTML="COMPUTER";
            else
                _txtRisultato.innerHTML=_txtUtente.value;
		}
		else if(cartaUtente=="mano") {
            if(cartaPC=="forbice")
                _txtRisultato.innerHTML="COMPUTER";
            else
                _txtRisultato.innerHTML=_txtUtente.value;
		}
		else if(cartaUtente=="forbice")  {
			if(cartaPC=="sasso")
				_txtRisultato.innerHTML="COMPUTER";
			else
				_txtRisultato.innerHTML=_txtUtente.value;
		}
	}
}


function random(min,max){
    return Math.floor((max-min+1)*Math.random())+min;
}