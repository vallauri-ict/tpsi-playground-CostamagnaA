"use strict";
let txtUtenti;
let sliderUtenti;
let checkBoxFiltri;

let valoreSalvato=0;
let nazionalita=["BR", "CA", "DE", "FR", "GB","US"];//AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NO, NL, NZ, TR, US
let sesso=["male","female"];
let password=["special","upper","lower","number"];
let dati;
let outputGenerati;
let cont=1;
window.onload = function () {

    outputGenerati=document.getElementsByClassName("generati");
    txtUtenti=document.getElementById("numeroUtenti");
    sliderUtenti=document.getElementById("sliderUtenti");
    checkBoxFiltri=document.getElementsByClassName("checkBoxFiltri");
    for(let i=0;i<checkBoxFiltri.length;i++)
    {
        caricaCheck(checkBoxFiltri[i].value,checkBoxFiltri[i]);
        cambiaStatoCheck(checkBoxFiltri[i].value,checkBoxFiltri[i])
    }
}
function generateUsers() {
    if(txtUtenti.value!="")
    {
    let numUsers=txtUtenti.value;
    let param="?results="+numUsers+"&&"+aggiungiFiltri();
    let finalUrl="https://randomuser.me/api"+param;
    console.log(finalUrl);
    $.ajax({
        url:finalUrl,
        dataType: 'json',
        success:function (usersData) {
            cont=1;
            console.log(usersData);
            dati=usersData.results;
            caricaDati(0,dati);
            document.getElementById("labelMax").innerText="di "+dati.length;
        }
    })
    }else{
        alert("enter numbers of users to be generated");
    }
}
function aggiungiFiltri() {
    let filtri="";
    for(let i=0;i<checkBoxFiltri.length;i++){
        if (checkBoxFiltri[i].checked)
        {
            filtri+=checkBoxFiltri[i].value+"=";
            let array=document.getElementsByClassName(checkBoxFiltri[i].value);
            let primoFiltro=true;
            for(let j=0;j<array.length;j++){
                if(array[j].checked){
                    let filtro="_"+array[j].id;
                    if(primoFiltro)
                        primoFiltro=false;
                    else{
                        filtri+=",";
                    }
                    filtri+=document.getElementById(filtro).innerText;
                }
            }
            filtri+="&&";
        }
    }
    return filtri;
}

//-------------------- gestione inserimento utenti
function sliderCambiato() {
    txtUtenti.value=sliderUtenti.value;
}
function testoCambiato() {
    console.log(sliderUtenti.max);
    if (parseInt(txtUtenti.value)>sliderUtenti.max||(txtUtenti.value<sliderUtenti.min&&txtUtenti.value!=""))
    {
        txtUtenti.value=valoreSalvato;
    }else{
        valoreSalvato=txtUtenti.value;
        sliderUtenti.value=valoreSalvato;
    }

}
//--------------------
function caricaCheck(tipo, checkAbilitaFiltro)
{

    switch (tipo)
    {
        case "nat":
            generaRadioOcheck(nazionalita,"checkbox","nat",checkAbilitaFiltro.parentNode);
            break;
        case "gender":
          generaRadioOcheck(sesso,"radio","gender",checkAbilitaFiltro.parentNode);
            break;
        case "password":
            generaRadioOcheck(password,"checkbox","password",checkAbilitaFiltro.parentNode);
            break;
    }
}
function generaRadioOcheck(array,tipo,name,doveInserire)
{
    for (let i=0;i<array.length;i++)
    {
        let labelRadioOCheck=document.createElement("label");
        labelRadioOCheck.innerText=array[i];
        labelRadioOCheck.for=array[i];
        labelRadioOCheck.id="_"+array[i];
        doveInserire.appendChild(labelRadioOCheck);
        let radioOCheck=document.createElement("input");
        radioOCheck.id=array[i];
        radioOCheck.type=tipo;
        radioOCheck.value=array[i];
        radioOCheck.name=name;
        radioOCheck.checked=false;
        radioOCheck.setAttribute("class",name);
        doveInserire.appendChild(radioOCheck);
    }
}
function caricaDati()
{
    let indice=cont-1;
    pulisciDati();
    document.getElementById("labelContatore").innerText="elemento "+cont;
    outputGenerati[0].src=dati[indice].picture.thumbnail;
  outputGenerati[1].innerText+=" "+ dati[indice].name.first;
  outputGenerati[2].innerText+=" "+dati[indice].name.last;
  outputGenerati[3].innerText+=" "+ dati[indice].gender;
    outputGenerati[4].innerText+=" "+ dati[indice].nat;
  outputGenerati[5].innerText+=" "+dati[indice].email;
    outputGenerati[6].innerText+=" "+dati[indice].login.password;
}
function pulisciDati(){
 for(let i=0;i<outputGenerati.length;i++)
 {
     outputGenerati[i].innerText=outputGenerati[i].id+": ";
 }
}
function cambiaStatoCheck(tipo,chkMaster) {

    switch (tipo)
    {
        case "nat":
            cambiaStato(nazionalita,chkMaster.checked);
            break;
        case "gender":
            cambiaStato(sesso,chkMaster.checked);
            break;
        case "password":
            cambiaStato(password,chkMaster.checked);
            break;
    }
}
function cambiaStato(array,valore) {
    for (let i=0;i<array.length;i++){
        let chkOradio=document.getElementById(array[i]);
        chkOradio.disabled=!valore;

    }
}
function cambiaIndice(step){
    step=parseInt(step);
    if((cont+step)>0&&(cont+step)<(dati.length+1)){
    cont+=step;
 caricaDati();
    }
}