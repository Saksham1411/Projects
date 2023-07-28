var green = document.querySelector(".link");
var circle = document.querySelector(".circle");
var img = document.querySelector(".shake img");
console.log(img);
green.addEventListener('click',(e)=>{
    var cls = (e.target.className);
    console.log(cls);
    circle.classList.remove('purple-crcl');
    circle.classList.remove('pink-crcl');
    circle.classList.add(cls);
    img.src = cls+".png";
    
})