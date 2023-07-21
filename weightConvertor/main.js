let out = document.querySelector('.output');
out.style.visibility = 'hidden';
let input = document.getElementById('inp');
input.addEventListener("input",runEvent);
let grms = document.getElementById('card1');
let pnd = document.getElementById('card2');
let ton = document.getElementById('card3');
function runEvent(e){
    out.style.visibility = 'visible';
    let kg = e.target.value;
    grms.lastChild.textContent = kg*1000;
    pnd.lastChild.textContent = kg*2.205;
    ton.lastChild.textContent = kg/1000;

}