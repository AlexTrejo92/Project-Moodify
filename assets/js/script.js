
var menu1 = document.getElementById("dropdown1");
menu1.addEventListener('click', e=>{
    e.stopPropagation()
    menu1.classList.toggle('is-active')
})

var menu2 = document.getElementById("dropdown2");
menu2.addEventListener('click', e=>{
    e.stopPropagation()
    menu2.classList.toggle('is-active')
})

var menu3 = document.getElementById("dropdown3");
menu3.addEventListener('click', e=>{
    e.stopPropagation()
    menu3.classList.toggle('is-active')
})